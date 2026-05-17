from typing import Tuple

KEYWORDS = {
    "Pothole / Road Damage": ["pothole", "road", "broken", "damaged road", "crater"],
    "Garbage Accumulation": ["garbage", "trash", "dump", "litter", "waste"],
    "Water Leakage": ["water", "leak", "leakage", "pipe", "flood", "drain"],
    "Damaged Electric Wire": ["wire", "electric", "cable", "pole", "transformer"],
    "Fire / Smoke": ["fire", "smoke", "burning"],
    "Illegal Parking": ["parking", "illegally", "blocked", "vehicle", "car parked"],
    "Dead Animal": ["dead animal", "dead dog", "dead cow", "animal body"],
    "Fallen Tree / Road Blockage": ["tree", "fallen", "branch", "road blocked"],
}

DEFAULT = "General Civic Issue"


def classify(caption: str, description: str = "") -> Tuple[str, str]:
    """Return (category, matched_keyword)"""
    text = " ".join([caption or "", description or ""]).lower()
    for category, kws in KEYWORDS.items():
        for kw in kws:
            if kw in text:
                return category, kw
    return DEFAULT, ""
