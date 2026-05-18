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
    "Water Leakage / Sewage Overflow",
    "Damaged Electric Wire / Power Outage",
    "Fire / Smoke",
    "Illegal Parking / Traffic Obstruction",
    "Dead Animal on Road",
    "Fallen Tree / Road Blockage",
    "Broken Street Light",
    "Open Drain / Manhole",
    "General Civic Issue",
]

DEPARTMENTS = {
    "Pothole / Road Damage": "Public Works Department (PWD) / Nagar Nigam",
    "Garbage Accumulation": "Municipal Solid Waste Management Department (Nagar Palika)",
    "Water Leakage / Sewage Overflow": "Jal Board / Urban Local Body Water Supply Department",
    "Damaged Electric Wire / Power Outage": "State Electricity Distribution Company (DISCOM)",
    "Fire / Smoke": "State Fire and Emergency Services Department",
    "Illegal Parking / Traffic Obstruction": "Traffic Police / City Traffic Management Cell",
    "Dead Animal on Road": "Animal Husbandry Department / Nagar Nigam Sanitation Wing",
    "Fallen Tree / Road Blockage": "Urban Forestry Department / Nagar Nigam",
    "Broken Street Light": "Municipal Street Lighting Department / DISCOM",
    "Open Drain / Manhole": "Urban Local Body (ULB) Drainage Department",
    "General Civic Issue": "Nagar Nigam / Urban Local Body (ULB)",
}

PROMPT = """You are JanSetu AI, a civic complaint analysis system for Indian cities.
Analyze the image and optional citizen description to identify the civic issue.

Return ONLY a valid JSON object with these exact fields:
{{
  "caption": "One precise sentence describing exactly what is visible in the image.",
  "category": "Exactly one category from the list provided.",
  "severity": "One of: Low, Medium, High, Critical",
  "summary": "Write 2-3 sentences: (1) describe the issue clearly, (2) explain the public impact or risk, (3) state urgency. Be specific and factual.",
  "recommended_action": "One clear actionable instruction for the responsible Indian government department."
}}

Categories: {categories}

Severity guide:
- Critical: Fire, exposed live electric wires, immediate danger to life or property
- High: Fallen tree blocking road, major water main burst, open deep manhole
- Medium: Pothole, garbage overflow, water leak, dead animal, illegal parking
- Low: Minor damage, cosmetic issues, broken street light in low-traffic area

Location context: {location}
Citizen description: {description}

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
            PROMPT.format(
                categories=", ".join(CATEGORIES),
                description=description or "none",
                location=location or "not specified",
            ),
        ]
    )

    raw = response.text.strip()
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

    return {
        "caption": data.get("caption", ""),
        "category": category,
        "severity": severity,
        "department": DEPARTMENTS.get(category, "Nagar Nigam / Urban Local Body (ULB)"),
        "summary": data.get("summary", ""),
        "recommended_action": data.get("recommended_action", "Inspect and assign to appropriate field team"),
    }
