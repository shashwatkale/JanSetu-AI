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

PROMPT = """You are a civic complaint analysis AI.

You are given:
1. The actual image of a civic issue
2. A BLIP-generated visual caption of the image
3. A user-written description of the problem (this is the PRIMARY source for the summary)
4. The location provided by the user
5. The severity selected by the user (treat this as FINAL — do not change it)

Return ONLY a valid JSON object with these exact fields:
{{
  "caption": "One factual sentence describing what is visible in the image. Base it on the BLIP caption. No assumptions or emotional language.",
  "category": "One of the categories listed below.",
  "severity": "{user_severity}",
  "summary": "2-3 sentences. PRIORITY ORDER: (1) incorporate the user's own description verbatim or closely paraphrased, (2) reference what the uploaded image shows, (3) mention the location if provided. Start with 'The user reported...'. Use only factual, neutral language. Do NOT use words like dangerous, hazardous, severe risk, major threat, or public health crisis unless the user explicitly wrote them.",
  "recommended_action": "One concise sentence (max 20 words) telling the responsible department the specific field action required. No background context, no repetition of the summary."
}}

Categories: {categories}

Severity field: Always output exactly "{user_severity}" — never modify it.

Summary rules:
- If user description is provided, it MUST be the primary basis of the summary
- Start with: "The user reported..."
- Then reference image: "The uploaded image shows..."
- Then location if available: "...near {location}."
- Objective and factual only — no predictions, no assumptions, no emotional wording

Action rules:
- One sentence, maximum 20 words
- Direct instruction to the department
- Specific to the issue type visible
- No repetition of summary content

User description: {description}
BLIP visual caption: {blip_caption}
Location: {location}
User-selected severity: {user_severity}

Respond with JSON only. No markdown. No explanation."""



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
