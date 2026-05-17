JanSetu AI - Pipeline

1. Image captioning: `services/image_caption.py` tries to load BLIP model `Salesforce/blip-image-captioning-base` from Hugging Face. If unavailable, a filename-based fallback caption is used.
2. Classification: `services/classifier.py` performs keyword matching on caption + user description to map to one of the complaint categories.
3. Severity: `services/severity.py` applies rules to map category and caption to severity levels (Low, Medium, High, Critical).
4. Routing: `services/routing.py` maps category to responsible department.
5. Summary & recommended action: `services/complaint_generator.py` creates a formal complaint summary and recommended action template.

The analyze endpoint composes these services and returns structured JSON for the frontend.
