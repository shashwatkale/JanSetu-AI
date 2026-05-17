from pathlib import Path
from PIL import Image

_model_loaded = False
_processor = None
_model = None

def _load_model():
    global _model_loaded, _processor, _model
    try:
        from transformers import BlipProcessor, BlipForConditionalGeneration
        _processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        _model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        _model_loaded = True
    except Exception:
        _model_loaded = False


def generate_caption(image_path: str) -> str:
    """Generate an image caption using BLIP. Falls back to a mock caption if model unavailable."""
    if not _model_loaded:
        try:
            _load_model()
        except Exception:
            pass

    if _model_loaded and _processor and _model:
        try:
            image = Image.open(image_path).convert("RGB")
            inputs = _processor(images=image, return_tensors="pt")
            out = _model.generate(**inputs)
            caption = _processor.decode(out[0], skip_special_tokens=True)
            return caption
        except Exception:
            pass

    # Fallback: simple heuristic based on filename
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
