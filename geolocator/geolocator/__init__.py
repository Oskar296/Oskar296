"""Planet-scale image geolocation.

Estimates where a photograph was taken by fusing three independent heads:
EXIF metadata, GeoCLIP retrieval, and Claude vision reasoning.
"""

from .predictor import Geolocator, PredictorConfig
from .types import GeoCandidate, HeadOutput, Place, Prediction
from .geo import haversine_km, geoguessr_score

__version__ = "0.1.0"

__all__ = [
    "Geolocator",
    "PredictorConfig",
    "GeoCandidate",
    "HeadOutput",
    "Place",
    "Prediction",
    "haversine_km",
    "geoguessr_score",
]
