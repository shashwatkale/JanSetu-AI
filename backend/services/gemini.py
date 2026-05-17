import os
import base64
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

CATEGORIES = [
    "Pothole / Road Damage",
    "Garbage Accumulation",
    "Water Leakage",
    "Damaged Electric Wire",
    "Fire / Smoke",
    "Illegal Parking",
    "Dead Animal",
    "Fallen Tree / Road Blockage",
    "General Civic Issue",
]

DEPARTMENTS = {
    "Pothole / Road Damage": "Municipal Corporation / PWD",
    "Garbage Accumulation": "Sanitation Department",
    "Water Leakage": "Water Department",
    "Damaged Electric Wire": "Electricity Board",
    "Fire / Smoke": "Fire Brigade",
    "Illegal Parking": "Traffic Police",
    "Dead Animal": "Animal Control / Sanitation Department",
    "Fallen Tree / Road Blockage": "Municipal Corporation",
    "General Civic Issue": "Municipal Corporation",
}

PROMPT = """You are a civic complaint analysis AI. Analyze this image and the optional user description.
Return ONLY a valid JSON object with these exact fields:
{{
  "caption": "one sentence describing what you see in the image",
  "category": "one of the categories listed",
  "severity": "one of: Low, Medium, High, Critical",
  "recommended_action": "one sentence action for the responsible department"
}}

Categories to choose from: {categories}

Severity guide:
- Critical: Fire, exposed electric wires, immediate danger to life
- High: Fallen tree blocking road, major water main burst
- Medium: Pothole, garbage, water leak, dead animal, illegal parking
- Low: Minor issues, cosmetic damage

User description (may be empty): {description}

Respond with JSON only, no markdown, no explanation."""


def analyze_image(image_path: str, description: str = "", location: str = "") -> dict:
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode("utf-8")

    ext = os.path.splitext(image_path)[1].lower().lstrip(".")
    mime = "image/jpeg" if ext in ("jpg", "jpeg") else f"image/{ext}"

    model = "gemini-2.5-flash"
    response = client.models.generate_content(
        model=model,
        contents=[
            types.Part.from_bytes(data=open(image_path, "rb").read(), mime_type=mime),
            PROMPT.format(categories=", ".join(CATEGORIES), description=description or "none"),
        ]
    )

    raw = response.text.strip()
    # strip markdown code block if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    data = json.loads(raw.strip())

    category = data.get("category", "General Civic Issue")
    if category not in CATEGORIES:
        category = "General Civic Issue"

    severity = data.get("severity", "Medium")
    if severity not in ("Low", "Medium", "High", "Critical"):
        severity = "Medium"

    loc = location or "unspecified location"
    caption = data.get("caption", "")
    summary = (
        f"A {severity} level complaint has been detected for {category} at {loc}. "
        f"The uploaded image and description indicate a civic issue that requires attention. "
        f"Caption: {caption}."
    )
    if description:
        summary += f" Description: {description.strip()}"

    return {
        "caption": caption,
        "category": category,
        "severity": severity,
        "department": DEPARTMENTS.get(category, "Municipal Corporation"),
        "summary": summary,
        "recommended_action": data.get("recommended_action", "Inspect and assign to appropriate field team"),
    }
