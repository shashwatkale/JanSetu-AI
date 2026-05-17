# JanSetu AI - MVP

Local development instructions and summary.

Backend:

1. cd backend
2. python -m venv venv
3. venv\Scripts\activate (Windows) or source venv/bin/activate (mac/linux)
4. pip install -r requirements.txt
5. python -m uvicorn main:app --reload --port 8000

If you are in the repo root, run:

```powershell
python -m uvicorn backend.main:app --reload --port 8000
```

Frontend:

1. cd frontend
2. npm install
3. npm run dev

Notes:
- The backend uses SQLite (backend/jan_setu.db). Uploads are saved to backend/uploads.
- Image captioning uses Salesforce/blip-image-captioning-base when transformers and torch are available. If not, a fallback heuristic caption is used.
