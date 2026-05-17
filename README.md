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

## Free deployment with Render

A ready-made `render.yaml` manifest is included for free hosting of both backend and frontend.

1. Push the repo to GitHub.
2. Sign in to https://render.com and connect your GitHub repo.
3. Render will detect both the backend service and the frontend static site from `render.yaml`.
4. After the backend service is created, update the frontend `VITE_API_BASE_URL` env var in Render with your backend URL.

If you prefer Vercel for frontend, use the same `VITE_API_BASE_URL` value and set the project root to `frontend`.

> Note: `render.yaml` now deploys only the backend service. The frontend can stay deployed on Vercel using the `VITE_API_BASE_URL` environment variable to point to the Render backend.
