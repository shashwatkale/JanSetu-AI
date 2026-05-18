from pathlib import Path


def generate_caption(image_path: str) -> str:
    name = Path(image_path).stem.lower()
    if any(k in name for k in ["pothole", "road", "broken"]):
        return "A damaged road with a pothole"
    if any(k in name for k in ["garbage", "trash", "dump"]):
        return "Piled up garbage and litter"
    if any(k in name for k in ["water", "leak", "pipe"]):
        return "Water leakage from a pipe"
    if any(k in name for k in ["wire", "electric", "cable"]):
        return "Damaged electric wire hanging"
    if any(k in name for k in ["fire", "smoke"]):
        return "Smoke or fire visible"
    if any(k in name for k in ["parking", "car", "vehicle"]):
        return "Vehicle parked illegally blocking the road"
    if any(k in name for k in ["animal", "dead"]):
        return "Dead animal on the roadside"
    if any(k in name for k in ["tree", "fallen", "branch"]):
        return "Fallen tree blocking the road"
    return "A civic issue captured in the image"
