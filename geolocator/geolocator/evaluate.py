"""Evaluation against ground-truth coordinates.

Reports the IM2GPS threshold protocol (the standard in the geolocation
literature) alongside median error and the GeoGuessr score, so results are
comparable both with published numbers and with how a human plays.
"""

from __future__ import annotations

import csv
import json
import os
import statistics
from dataclasses import dataclass, field

from .geo import IM2GPS_THRESHOLDS_KM, geoguessr_score, haversine_km, threshold_accuracy


@dataclass
class Item:
    path: str
    lat: float
    lon: float


@dataclass
class Result:
    item: Item
    pred_lat: float
    pred_lon: float
    error_km: float
    score: int
    confidence: float
    radius_km: float
    place: str = ""


@dataclass
class Report:
    results: list[Result] = field(default_factory=list)
    failures: list[tuple[str, str]] = field(default_factory=list)

    @property
    def errors(self) -> list[float]:
        return [r.error_km for r in self.results]

    def summary(self) -> dict:
        errs = self.errors
        if not errs:
            return {"n": 0, "failures": len(self.failures)}
        acc = threshold_accuracy(errs)
        return {
            "n": len(errs),
            "failures": len(self.failures),
            "median_error_km": round(statistics.median(errs), 2),
            "mean_error_km": round(sum(errs) / len(errs), 2),
            "mean_geoguessr_score": round(
                sum(r.score for r in self.results) / len(self.results), 1
            ),
            "accuracy": {f"<={int(t)}km": round(v, 4) for t, v in acc.items()},
            "calibration": self.calibration(),
        }

    def calibration(self) -> dict:
        """Does the reported radius mean anything?

        The radius claims to hold 68% of the posterior, so across a dataset
        roughly 68% of true locations should fall inside it. A number far from
        that says the confidences are decorative, which matters more than a
        good median error when someone has to act on a prediction.
        """
        if not self.results:
            return {}
        inside = sum(1 for r in self.results if r.error_km <= r.radius_km)
        return {
            "claimed_mass": 0.68,
            "observed_within_radius": round(inside / len(self.results), 4),
        }

    def to_json(self) -> str:
        return json.dumps(
            {
                "summary": self.summary(),
                "results": [
                    {
                        "path": r.item.path,
                        "true": [r.item.lat, r.item.lon],
                        "pred": [round(r.pred_lat, 5), round(r.pred_lon, 5)],
                        "error_km": round(r.error_km, 2),
                        "score": r.score,
                        "confidence": round(r.confidence, 4),
                        "radius_km": round(r.radius_km, 1),
                        "place": r.place,
                    }
                    for r in self.results
                ],
                "failures": [{"path": p, "error": e} for p, e in self.failures],
            },
            indent=2,
        )


def load_dataset(path: str) -> list[Item]:
    """Read a CSV (image,lat,lon) or JSONL dataset.

    Relative image paths resolve against the dataset file's own directory,
    so a dataset folder stays portable.
    """
    base = os.path.dirname(os.path.abspath(path))

    def resolve(p: str) -> str:
        return p if os.path.isabs(p) else os.path.normpath(os.path.join(base, p))

    items: list[Item] = []
    if path.endswith(".jsonl"):
        with open(path, encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                row = json.loads(line)
                items.append(
                    Item(resolve(row["image"]), float(row["lat"]), float(row["lon"]))
                )
        return items

    with open(path, newline="", encoding="utf-8") as fh:
        # Allow '#' comments and blank lines so a dataset can document itself.
        rows = (line for line in fh if line.strip() and not line.lstrip().startswith("#"))
        reader = csv.DictReader(rows)
        required = {"image", "lat", "lon"}
        if not required.issubset({(c or "").strip() for c in (reader.fieldnames or [])}):
            raise ValueError(
                f"{path} must have image, lat and lon columns; found {reader.fieldnames}"
            )
        for row in reader:
            items.append(
                Item(resolve(row["image"].strip()), float(row["lat"]), float(row["lon"]))
            )
    return items


def evaluate(locator, items: list[Item], progress=None) -> Report:
    report = Report()
    for i, item in enumerate(items, 1):
        try:
            pred = locator.locate(item.path)
        except Exception as exc:  # noqa: BLE001 - one bad image must not end the run
            report.failures.append((item.path, str(exc)))
            if progress:
                progress(i, len(items), item.path, None)
            continue
        err = haversine_km(item.lat, item.lon, pred.lat, pred.lon)
        result = Result(
            item=item,
            pred_lat=pred.lat,
            pred_lon=pred.lon,
            error_km=err,
            score=geoguessr_score(err),
            confidence=pred.confidence,
            radius_km=pred.radius_km,
            place=pred.place.describe(),
        )
        report.results.append(result)
        if progress:
            progress(i, len(items), item.path, result)
    return report


def format_summary(report: Report) -> str:
    s = report.summary()
    if not s.get("n"):
        return f"No successful predictions ({s.get('failures', 0)} failures)."
    lines = [
        f"images evaluated     {s['n']}  (failures: {s['failures']})",
        f"median error         {s['median_error_km']:,.1f} km",
        f"mean error           {s['mean_error_km']:,.1f} km",
        f"mean GeoGuessr score {s['mean_geoguessr_score']:,.0f} / 5000",
        "",
        "accuracy within threshold (IM2GPS protocol)",
    ]
    names = {
        "<=1km": "street  1 km",
        "<=25km": "city   25 km",
        "<=200km": "region 200 km",
        "<=750km": "country 750 km",
        "<=2500km": "continent 2500 km",
    }
    for key, value in s["accuracy"].items():
        lines.append(f"  {names.get(key, key):<20} {value:6.1%}")
    cal = s.get("calibration") or {}
    if cal:
        lines += [
            "",
            f"calibration: {cal['observed_within_radius']:.1%} of true locations fell "
            f"inside the reported radius (target {cal['claimed_mass']:.0%})",
        ]
    return "\n".join(lines)
