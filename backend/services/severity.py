def predict_severity(category: str, caption: str = "") -> str:
    cat = category or ""
    cat = cat.lower()
    caption = (caption or "").lower()
    if "fire" in cat or "fire" in caption or "smoke" in cat or "smoke" in caption:
        return "Critical"
    if "damaged electric" in cat or "electric" in cat or "wire" in caption:
        return "Critical"
    if "fallen tree" in cat or "fallen" in caption or "tree" in caption:
        # high if blocked/road/danger in caption
        if any(k in caption for k in ["blocked", "road", "danger", "blocking"]):
            return "High"
        return "Medium"
    if "water" in cat:
        return "Medium"
    if "pothole" in cat or "road damage" in cat:
        return "Medium"
    if "garbage" in cat:
        # guess low or medium depending on words
        if any(k in caption for k in ["overflow", "large", "piled", "huge"]):
            return "Medium"
        return "Low"
    if "dead animal" in cat:
        return "Medium"
    if "illegal parking" in cat:
        return "Medium"
    return "Low"
