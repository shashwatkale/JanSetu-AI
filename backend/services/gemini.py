import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv
from services.image_caption import generate_caption

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

PROMPT = """You are a civic complaint analysis AI. You are given:
1. The actual image
2. A BLIP-generated visual caption describing what is in the image
3. An optional user description and location
4. The user-reported severity of the issue

Use ALL of the above to return ONLY a valid JSON object with these exact fields:
{{
  "caption": "one precise sentence describing exactly what is visible in the image, incorporating the BLIP caption",
  "category": "one of the categories listed",
  "severity": "final severity after weighing both your visual analysis AND the user-reported severity — if user says Critical/Severe but image looks minor, explain in summary; if image looks worse than user says, escalate",
  "summary": "2-3 sentences: what the issue is visually, how your AI severity compares to user-reported severity ({user_severity}), and why it needs attention — be specific, include location if provided",
  "recommended_action": "one specific actionable sentence for the responsible department based on what is visible"
}}

Categories to choose from: {categories}

Severity scale (use exactly one): Low, Medium, High, Severe, Critical
Severity guide:
- Critical: Fire, exposed electric wires, immediate danger to life
- Severe: Major structural damage, large water main burst, road fully blocked
- High: Fallen tree, significant pothole, large garbage pile
- Medium: Moderate pothole, water leak, dead animal, illegal parking
- Low: Minor issues, cosmetic damage

User-reported severity: {user_severity}
BLIP visual caption: {blip_caption}
Location: {location}
User description (may be empty): {description}

Respond with JSON only, no markdown, no explanation."""



def analyze_image(image_path: str, description: str = "", location: str = "", user_severity: str = "") -> dict:
    blip_caption = generate_caption(image_path)

    ext = os.path.splitext(image_path)[1].lower().lstrip(".")
    mime = "image/jpeg" if ext in ("jpg", "jpeg") else f"image/{ext}"

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(data=open(image_path, "rb").read(), mime_type=mime),
            PROMPT.format(
                categories=", ".join(CATEGORIES),
                blip_caption=blip_caption,
                user_severity=user_severity or "Not specified",
                description=description or "none",
                location=location or "unspecified",
            ),
        ]
    )
    # print(f"Raw response: {response}")
    print(f"Prompt: {PROMPT}")
    print(f"Blip caption: {blip_caption}")

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

    VALID_SEVERITIES = ("Low", "Medium", "High", "Severe", "Critical")
    severity = data.get("severity", "Medium")
    if severity not in VALID_SEVERITIES:
        severity = "Medium"

    caption = data.get("caption", "")
    summary = data.get("summary", f"{severity} severity {category} issue reported. Immediate inspection required.")

    result = {
        "caption": caption,
        "category": category,
        "severity": severity,
        "department": DEPARTMENTS.get(category, "Municipal Corporation"),
        "summary": summary,
        "recommended_action": data.get("recommended_action", "Inspect and assign to appropriate field team"),
    }
    print(f"Result: {result}")
    return result
