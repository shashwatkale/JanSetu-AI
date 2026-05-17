from datetime import datetime


def generate_summary(category: str, severity: str, location: str, caption: str, description: str) -> str:
    loc = location or "unspecified location"
    desc_part = f" Description: {description.strip()}" if description else ""
    return (
        f"A {severity} level complaint has been detected for {category} at {loc}. "
        f"The uploaded image and description indicate a civic issue that requires attention from the responsible department. "
        f"Caption: {caption}.{desc_part}"
    )


def recommended_action_for(category: str, severity: str) -> str:
    cat = (category or "").lower()
    if "fire" in cat:
        return "Call the Fire Brigade immediately and cordon off area"
    if "electric" in cat or "wire" in cat:
        return "Dispatch electrical safety team and disconnect power if needed"
    if "water" in cat:
        return "Send water department crew to inspect pipe and stop leakage"
    if "garbage" in cat:
        return "Schedule sanitation pickup and clean the site"
    if "pothole" in cat or "road" in cat:
        return "Inspect road and arrange patching by PWD"
    return "Inspect and assign to appropriate field team"
