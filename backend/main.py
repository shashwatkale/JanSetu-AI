import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
from datetime import datetime
import shutil
import uuid

from database import init_db, SessionLocal, Complaint, ComplaintStatusLog
from services.image_caption import generate_caption
from services.classifier import classify
from services.routing import route_to_department
from services.severity import predict_severity
from services.complaint_generator import generate_summary, recommended_action_for


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    yield
    # Shutdown


app = FastAPI(title="JanSetu AI - Complaint Routing MVP", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def save_upload(file: UploadFile) -> str:
    ext = Path(file.filename).suffix or ".jpg"
    fn = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / fn
    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return str(dest)


@app.post("/api/complaints/analyze")
async def analyze_complaint(
    image: UploadFile = File(...),
    description: str = Form(None),
    location: str = Form(None),
):
    # Save file
    try:
        path = save_upload(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save upload: {e}")

    # Generate caption (with fallback)
    caption = generate_caption(path)

    # Classify
    category, matched = classify(caption, description or "")

    # Severity
    severity = predict_severity(category, caption)

    # Department
    department = route_to_department(category)

    # Summary & recommended action
    summary = generate_summary(category, severity, location or "unspecified location", caption, description or "")
    recommended_action = recommended_action_for(category, severity)

    return JSONResponse({
        "caption": caption,
        "category": category,
        "severity": severity,
        "department": department,
        "summary": summary,
        "recommended_action": recommended_action,
        "image_path": path,
    })


@app.post("/api/complaints/submit")
async def submit_complaint(payload: dict):
    required = ["user_id", "image_path", "caption", "category", "severity", "department", "summary"]
    for r in required:
        if r not in payload:
            raise HTTPException(status_code=400, detail=f"Missing field: {r}")

    db = SessionLocal()
    try:
        # generate complaint_id
        cid = f"JS-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:6]}"
        comp = Complaint(
            complaint_id=cid,
            user_id=payload.get("user_id"),
            image_path=payload.get("image_path"),
            description=payload.get("description"),
            location=payload.get("location"),
            caption=payload.get("caption"),
            category=payload.get("category"),
            severity=payload.get("severity"),
            department=payload.get("department"),
            summary=payload.get("summary"),
            recommended_action=payload.get("recommended_action"),
            status="Submitted",
        )
        db.add(comp)
        db.commit()
        db.refresh(comp)

        # add initial log
        log = ComplaintStatusLog(complaint_id=comp.id, status="Submitted", remarks="", updated_by=str(payload.get("user_id")))
        db.add(log)
        db.commit()

        return {"complaint_id": cid, "status": "Submitted", "message": "Complaint submitted successfully"}
    finally:
        db.close()


@app.get("/api/complaints/user/{user_id}")
def get_user_complaints(user_id: int):
    db = SessionLocal()
    try:
        rows = db.query(Complaint).filter(Complaint.user_id == user_id).all()
        out = []
        for r in rows:
            out.append({
                "id": r.id,
                "complaint_id": r.complaint_id,
                "image_path": r.image_path,
                "description": r.description,
                "location": r.location,
                "caption": r.caption,
                "category": r.category,
                "severity": r.severity,
                "department": r.department,
                "summary": r.summary,
                "recommended_action": r.recommended_action,
                "status": r.status,
                "created_at": r.created_at,
                "updated_at": r.updated_at,
            })
        return out
    finally:
        db.close()


@app.get("/api/admin/complaints")
def get_all_complaints():
    db = SessionLocal()
    try:
        rows = db.query(Complaint).order_by(Complaint.created_at.desc()).all()
        out = []
        for r in rows:
            out.append({
                "id": r.id,
                "complaint_id": r.complaint_id,
                "image_path": r.image_path,
                "description": r.description,
                "location": r.location,
                "caption": r.caption,
                "category": r.category,
                "severity": r.severity,
                "department": r.department,
                "summary": r.summary,
                "recommended_action": r.recommended_action,
                "status": r.status,
                "created_at": r.created_at,
                "updated_at": r.updated_at,
            })
        return out
    finally:
        db.close()


@app.put("/api/admin/complaints/{complaint_id}/status")
def update_complaint_status(complaint_id: int, payload: dict):
    db = SessionLocal()
    try:
        comp = db.query(Complaint).filter(Complaint.id == complaint_id).first()
        if not comp:
            raise HTTPException(status_code=404, detail="Complaint not found")
        status = payload.get("status")
        remarks = payload.get("remarks", "")
        updated_by = payload.get("updated_by", "admin")
        if status:
            comp.status = status
            comp.updated_at = datetime.utcnow()
            db.add(comp)
            log = ComplaintStatusLog(complaint_id=comp.id, status=status, remarks=remarks, updated_by=updated_by)
            db.add(log)
            db.commit()
            return {"message": "Status updated", "complaint_id": comp.complaint_id, "status": status}
        else:
            raise HTTPException(status_code=400, detail="Missing status field")
    finally:
        db.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
