"""Command line interface."""

from __future__ import annotations

import argparse
import json
import sys

from .evaluate import evaluate, format_summary, load_dataset
from .predictor import Geolocator, PredictorConfig
from .reasoner import ReasonerConfig
from .retrieval import RetrievalConfig


def _build_locator(args) -> Geolocator:
    cfg = PredictorConfig(
        use_exif=not args.no_exif,
        use_retrieval=not args.no_retrieval,
        use_reasoner=False if args.no_reasoner else (True if args.reasoner else None),
        retrieval=RetrievalConfig(device=args.device, top_k=args.top_k),
        reasoner=ReasonerConfig(model=args.model, extra_hint=getattr(args, "hint", "")),
    )
    return Geolocator(cfg)


def _format_radius(km: float) -> str:
    """Metres read better than "~0 km" when the answer came from EXIF."""
    if km < 1.0:
        return f"{km * 1000.0:,.0f} m"
    return f"{km:,.0f} km"


def _osm_link(lat: float, lon: float) -> str:
    return f"https://www.openstreetmap.org/?mlat={lat:.5f}&mlon={lon:.5f}#map=12/{lat:.5f}/{lon:.5f}"


def cmd_predict(args) -> int:
    locator = _build_locator(args)
    try:
        pred = locator.locate(args.image)
    except Exception as exc:  # noqa: BLE001
        print(f"error: {exc}", file=sys.stderr)
        return 1

    if args.json:
        payload = pred.as_dict()
        payload["warnings"] = locator.warnings
        print(json.dumps(payload, indent=2))
        return 0

    where = pred.place.describe() or "unnamed location"
    print(f"\n  {where}")
    print(f"  {pred.lat:.5f}, {pred.lon:.5f}")
    print(
        f"  within ~{_format_radius(pred.radius_km)}"
        f"  (confidence {pred.confidence:.0%} inside 200 km)"
    )
    print(f"  {_osm_link(pred.lat, pred.lon)}")

    if pred.alternatives:
        print("\n  other possibilities")
        for alt in pred.alternatives:
            label = alt.label or f"{alt.lat:.3f}, {alt.lon:.3f}"
            print(f"    {alt.weight:5.1%}  {label}  [{alt.source}]")

    if args.explain and pred.rationale:
        print("\n  reasoning")
        for line in pred.rationale.splitlines():
            print(f"    {line}")

    if args.explain:
        for head in pred.heads:
            cues = head.evidence.get("cues")
            if not cues:
                continue
            print(f"\n  cues seen by {head.name}")
            for key, value in cues.items():
                if not value or value in ("unknown", "none"):
                    continue
                if isinstance(value, list):
                    value = ", ".join(str(v) for v in value)
                print(f"    {key.replace('_', ' '):<18} {value}")

    for warning in locator.warnings:
        print(f"\n  note: {warning}", file=sys.stderr)
    return 0


def cmd_eval(args) -> int:
    locator = _build_locator(args)
    items = load_dataset(args.dataset)
    if args.limit:
        items = items[: args.limit]
    print(f"evaluating {len(items)} images...", file=sys.stderr)

    def progress(i, total, path, result):
        if result is None:
            print(f"  [{i}/{total}] {path}: FAILED", file=sys.stderr)
        else:
            print(
                f"  [{i}/{total}] {path}: {result.error_km:,.1f} km ({result.score})",
                file=sys.stderr,
            )

    report = evaluate(locator, items, progress if not args.quiet else None)
    print()
    print(format_summary(report))
    if args.out:
        with open(args.out, "w", encoding="utf-8") as fh:
            fh.write(report.to_json())
        print(f"\nwrote {args.out}")
    return 0


def cmd_serve(args) -> int:
    from .server import serve

    serve(_build_locator(args), host=args.host, port=args.port)
    return 0


def build_parser() -> argparse.ArgumentParser:
    # Shared options live on a parent parser so they are accepted both before
    # and after the subcommand; argparse otherwise rejects them once a
    # subcommand has been seen, which is never what anyone expects.
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("--no-exif", action="store_true", help="ignore GPS metadata")
    common.add_argument("--no-retrieval", action="store_true", help="disable the GeoCLIP head")
    common.add_argument(
        "--no-reasoner", action="store_true", help="disable the Claude vision head"
    )
    common.add_argument(
        "--reasoner", action="store_true", help="force the Claude vision head on"
    )
    common.add_argument("--model", default=ReasonerConfig.model, help="Claude model id")
    common.add_argument("--device", default="cpu", help="torch device, e.g. cuda")
    common.add_argument("--top-k", type=int, default=24, help="gallery candidates to retain")

    parser = argparse.ArgumentParser(
        prog="geolocate",
        description="Estimate where a photograph was taken.",
        parents=[common],
    )

    sub = parser.add_subparsers(dest="command")

    p = sub.add_parser("predict", help="locate a single image", parents=[common])
    p.add_argument("image")
    p.add_argument("--json", action="store_true")
    p.add_argument("--explain", action="store_true", help="show reasoning and cues")
    p.add_argument("--hint", default="", help="extra context to give the reasoner")
    p.set_defaults(func=cmd_predict)

    e = sub.add_parser("eval", help="score against a ground-truth dataset", parents=[common])
    e.add_argument("dataset", help="CSV with image,lat,lon columns, or a .jsonl file")
    e.add_argument("--limit", type=int, default=0)
    e.add_argument("--out", default="", help="write a JSON report here")
    e.add_argument("--quiet", action="store_true")
    e.set_defaults(func=cmd_eval)

    s = sub.add_parser("serve", help="run the local web interface", parents=[common])
    s.add_argument("--host", default="127.0.0.1")
    s.add_argument("--port", type=int, default=8000)
    s.set_defaults(func=cmd_serve)

    return parser


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    parser = build_parser()

    # Allow `geolocate photo.jpg` as shorthand for `geolocate predict photo.jpg`.
    commands = {"predict", "eval", "serve"}
    if argv and not argv[0].startswith("-") and argv[0] not in commands:
        argv.insert(0, "predict")

    args = parser.parse_args(argv)
    if not getattr(args, "func", None):
        parser.print_help()
        return 2
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
