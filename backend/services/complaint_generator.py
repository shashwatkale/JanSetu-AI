def generate_summary(category: str, severity: str, location: str, caption: str, description: str) -> str:
    loc = f"near {location}" if location else "at an unspecified location"
    parts = []

    # Priority 1: user description
    if description and description.strip():
        parts.append(f"The user reported: \"{description.strip()}\"")
    else:
        parts.append(f"The user reported a {category} issue {loc}.")

    # Priority 2: image observation
    if caption and caption.strip():
        parts.append(f"The uploaded image shows {caption.rstrip('.')}.")

    # Priority 3: department routing note
    parts.append(f"The issue has been categorized as {category} and assigned for departmental review.")

    return " ".join(parts)


def recommended_action_for(category: str, severity: str = "") -> str:
    cat = (category or "").lower()
    if "fire" in cat or "smoke" in cat:
        return "Dispatch the fire brigade to inspect and secure the reported location immediately."
    if "electric" in cat or "wire" in cat:
        return "Send an electrical safety team to inspect and isolate the reported wire."
    if "water" in cat:
        return "Dispatch a water department crew to locate and repair the reported leakage."
    if "garbage" in cat:
        return "Inspect the reported location and schedule waste collection if required."
    if "pothole" in cat or "road" in cat:
        return "Inspect the reported road section and arrange patching if required."
    if "tree" in cat:
        return "Send a field team to clear the reported fallen tree from the road."
    if "animal" in cat:
        return "Dispatch animal control to remove and dispose of the reported carcass."
    if "parking" in cat:
        return "Deploy traffic personnel to verify and address the reported illegal parking."
    if "streetlight" in cat or "light" in cat:
        return "Assign an electrician to inspect and repair the reported streetlight."
    if "drain" in cat:
        return "Inspect the reported drainage point and clear any blockage found."
    return "Inspect the reported location and assign to the appropriate field team."
