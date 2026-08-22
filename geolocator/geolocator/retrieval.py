"""Image -> GPS retrieval head, built on GeoCLIP.

GeoCLIP aligns a CLIP image embedding with a learned encoding of latitude and
longitude, so locating a photo becomes a nearest-neighbour lookup against a
gallery of 100k coordinates. This module wraps it with the things the stock
`predict()` helper leaves out:

* images are forced to RGB (the stock path crashes on greyscale and CMYK),
* multi-crop and horizontal-flip test-time augmentation, which recovers detail
  a single centre crop throws away,
* a softmax temperature, because the raw logit scale is peaked to the point of
  being useless as a distribution to fuse with,
* per-candidate sigmas taken from the local density of the gallery, so a hit in
  well-covered Europe is not given the same precision as one in Siberia.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Sequence

from .types import GeoCandidate, HeadOutput

_MODEL_ID = "openai/clip-vit-large-patch14"


class ModelUnavailable(RuntimeError):
    """Raised when the CLIP backbone cannot be fetched or loaded."""


@dataclass
class RetrievalConfig:
    top_k: int = 24
    # >1 flattens the peaked gallery softmax into something fusable.
    temperature: float = 2.0
    # Centre crop plus four corners, each optionally flipped.
    multi_crop: bool = True
    flip: bool = True
    # Sigma floor/ceiling in km for retrieved candidates.
    min_sigma_km: float = 20.0
    max_sigma_km: float = 400.0
    device: str = "cpu"
    trust: float = 1.0


class RetrievalHead:
    """Lazily-loaded GeoCLIP wrapper."""

    name = "retrieval"

    def __init__(self, config: RetrievalConfig | None = None) -> None:
        self.config = config or RetrievalConfig()
        self._model = None
        self._gallery = None
        self._gallery_feats = None
        self._sigmas = None

    # -- loading ----------------------------------------------------------

    def load(self) -> None:
        if self._model is not None:
            return
        try:
            import torch
            from geoclip import GeoCLIP
        except ImportError as exc:  # pragma: no cover - depends on install
            raise ModelUnavailable(
                "geoclip and torch are required: pip install torch geoclip"
            ) from exc

        try:
            model = GeoCLIP()
        except Exception as exc:  # noqa: BLE001 - surface any download failure
            raise ModelUnavailable(
                f"could not load the CLIP backbone ({_MODEL_ID}). It is downloaded "
                "from Hugging Face on first use; pre-fetch it with "
                f"'huggingface-cli download {_MODEL_ID}' on a machine with access, "
                f"or point HF_HOME at a populated cache. Original error: {exc}"
            ) from exc

        model.eval()
        model.to(self.config.device)
        self._model = model
        self._gallery = model.gps_gallery
        with torch.no_grad():
            feats = model.location_encoder(self._gallery.to(self.config.device))
            self._gallery_feats = torch.nn.functional.normalize(feats, dim=1)
        self._sigmas = self._compute_sigmas()

    def _compute_sigmas(self):
        """Per-gallery-point sigma from the local density of the gallery.

        Gallery density tracks how much of the world's imagery comes from a
        region, so it is a fair proxy for how finely we can resolve there: a hit
        in densely-covered Europe deserves a tighter kernel than one in Siberia.

        Density comes from an equal-area grid rather than exact nearest
        neighbours; the exact version needs a 100k x 100k similarity matrix,
        which costs gigabytes and a minute of CPU to make no visible difference
        to a number that only sets a kernel width.
        """
        import numpy as np

        cfg = self.config
        coords = self._gallery.cpu().numpy().astype("float64")
        lat = np.clip(coords[:, 0], -89.999, 89.999)
        lon = ((coords[:, 1] + 180.0) % 360.0) - 180.0

        step = 2.0  # degrees
        n_lat = int(180.0 / step)
        n_lon = int(360.0 / step)
        row = np.clip(((90.0 - lat) / step).astype(int), 0, n_lat - 1)
        col = np.clip(((lon + 180.0) / step).astype(int), 0, n_lon - 1)

        counts = np.zeros((n_lat, n_lon), dtype="float64")
        np.add.at(counts, (row, col), 1.0)

        # Smooth over the 3x3 neighbourhood so a cell boundary does not create a
        # cliff in the sigmas. Longitude wraps; latitude does not.
        smooth = np.zeros_like(counts)
        for dr in (-1, 0, 1):
            rolled = np.roll(counts, dr, axis=0)
            if dr == -1:
                rolled[-1, :] = 0.0
            elif dr == 1:
                rolled[0, :] = 0.0
            for dc in (-1, 0, 1):
                smooth += np.roll(rolled, dc, axis=1)

        # True spherical-cap area of each latitude band, in km^2.
        edges = np.radians(90.0 - np.arange(n_lat + 1) * step)
        band = (
            (6371.0088**2)
            * np.radians(step)
            * np.abs(np.sin(edges[:-1]) - np.sin(edges[1:]))
        )
        cell_area = np.repeat(band[:, None], n_lon, axis=1)
        # The smoothed count covers roughly nine cells' worth of area.
        area = np.zeros_like(cell_area)
        for dr in (-1, 0, 1):
            rolled = np.roll(cell_area, dr, axis=0)
            if dr == -1:
                rolled[-1, :] = 0.0
            elif dr == 1:
                rolled[0, :] = 0.0
            area += 3.0 * rolled  # three longitude neighbours share each band

        density = smooth / np.maximum(area, 1e-9)  # points per km^2
        spacing = 1.0 / np.sqrt(np.maximum(density, 1e-12))  # km between points
        sigmas = spacing[row, col]
        return np.clip(sigmas, cfg.min_sigma_km, cfg.max_sigma_km).astype("float32")

    # -- inference --------------------------------------------------------

    def _crops(self, image):
        """Centre crop plus four corners, mirroring CLIP's own preprocessing."""
        from PIL import Image as PILImage

        w, h = image.size
        side = min(w, h)
        half = int(side * 0.72)
        boxes = [
            ((w - side) // 2, (h - side) // 2, (w - side) // 2 + side, (h - side) // 2 + side),
            (0, 0, half, half),
            (w - half, 0, w, half),
            (0, h - half, half, h),
            (w - half, h - half, w, h),
        ]
        crops = [image]
        for box in boxes:
            if box[2] - box[0] > 32 and box[3] - box[1] > 32:
                crops.append(image.crop(box))
        if self.config.flip:
            crops = crops + [c.transpose(PILImage.FLIP_LEFT_RIGHT) for c in crops]
        return crops

    def embed(self, image):
        """Normalised, TTA-averaged image embedding in GeoCLIP's joint space."""
        import torch

        self.load()
        views = self._crops(image) if self.config.multi_crop else [image]
        with torch.no_grad():
            pixels = self._model.image_encoder.preprocess_image(views)
            pixels = pixels.to(self.config.device)
            feats = self._model.image_encoder(pixels)
            feats = torch.nn.functional.normalize(feats, dim=1)
            # Average the unit vectors, then renormalise: the mean direction of
            # the views, not the direction of any single one.
            mean = torch.nn.functional.normalize(feats.mean(dim=0, keepdim=True), dim=1)
        return mean

    def predict(self, image) -> HeadOutput:
        import torch

        self.load()
        embedding = self.embed(image)
        logit_scale = self._model.logit_scale.exp().item()
        logits = logit_scale * (embedding @ self._gallery_feats.t())
        probs = torch.softmax(logits / max(1e-6, self.config.temperature), dim=-1)[0]

        k = min(self.config.top_k, probs.shape[0])
        top = torch.topk(probs, k)
        candidates: list[GeoCandidate] = []
        for prob, idx in zip(top.values.tolist(), top.indices.tolist()):
            lat, lon = self._gallery[idx].tolist()
            candidates.append(
                GeoCandidate(
                    lat=lat,
                    lon=lon,
                    weight=prob,
                    sigma_km=float(self._sigmas[idx]),
                    source=self.name,
                )
            )
        mass = float(top.values.sum().item())
        return HeadOutput(
            name=self.name,
            candidates=candidates,
            trust=self.config.trust,
            rationale=(
                f"GeoCLIP matched the image against a 100k-point GPS gallery; "
                f"the top {k} points hold {mass:.1%} of the retrieval mass."
            ),
            evidence={"top_k": k, "retained_mass": round(mass, 4)},
        )


def load_image(path: str):
    """Open an image as RGB, honouring EXIF orientation."""
    from PIL import Image, ImageOps

    if not os.path.exists(path):
        raise FileNotFoundError(path)
    image = Image.open(path)
    image = ImageOps.exif_transpose(image)
    return image.convert("RGB")
