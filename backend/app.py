"""
SAAKHYA — Intelligent Brand Governance Platform
FastAPI Backend Application with Role-Based Access Control (RBAC)
Team: HORIZON
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import datetime

from rule_engine import scan_text
from pdf_parser import extract_text_from_pdf_bytes

app = FastAPI(
    title="SAAKHYA Brand Governance API",
    description="Backend services for Brand DNA enforcement, multi-format content review, and RBAC.",
    version="1.1.0"
)

# Enable CORS for local development & frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    text: str
    language: Optional[str] = "English"
    channel: Optional[str] = "Social Media"
    campaign: Optional[str] = "General"

class SimulateRuleRequest(BaseModel):
    proposed_rule: str
    category: Optional[str] = "claims"

class GuidelineCreateRequest(BaseModel):
    category: str
    title: str
    ruleStatement: str
    rationale: str
    severity: str
    forbiddenTerms: Optional[List[str]] = None
    approvedTerms: Optional[List[str]] = None

MOCK_GUIDELINES = [
    {
        "id": "bg-1",
        "category": "claims",
        "title": "No Unsupported Absolute Superlatives & Guarantees",
        "ruleStatement": "Never use absolute claims such as '100% Guaranteed', 'The World's Best', or 'Unbeatable Performance' without accredited third-party validation.",
        "rationale": "Complies with ASCI Code for Self-Regulation Chapter I and CCPA Misleading Advertisement Guidelines.",
        "severity": "Critical",
        "version": "v2.1",
        "status": "active"
    },
    {
        "id": "bg-2",
        "category": "terminology",
        "title": "Approved Product & AI Terminology",
        "ruleStatement": "Use 'Autonomous Agent Layer' and 'Governed Workflow' instead of deprecated terms like 'Automated Robot' or 'Magic Bot'.",
        "rationale": "Establishes enterprise rigor and eliminates childish or misleading AI hype.",
        "severity": "High",
        "version": "v2.0",
        "status": "active"
    }
]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "SAAKHYA Intelligent Brand Governance Platform",
        "team": "HORIZON",
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/api/guidelines")
def get_guidelines():
    return {"guidelines": MOCK_GUIDELINES}

@app.post("/api/guidelines")
def add_guideline(
    req: GuidelineCreateRequest,
    x_user_role: Optional[str] = Header(default="admin")
):
    """
    Enforces RBAC: Only Admin can create or modify Brand DNA guidelines.
    """
    if x_user_role != "admin":
        raise HTTPException(
            status_code=403, 
            detail="Forbidden: Only Admin / Brand Managers have permission to add or modify Brand DNA rules."
        )

    new_g = {
        "id": f"bg-{len(MOCK_GUIDELINES)+1}",
        "category": req.category,
        "title": req.title,
        "ruleStatement": req.ruleStatement,
        "rationale": req.rationale,
        "severity": req.severity,
        "forbiddenTerms": req.forbiddenTerms,
        "approvedTerms": req.approvedTerms,
        "version": "v1.0",
        "status": "active"
    }
    MOCK_GUIDELINES.append(new_g)
    return {"message": "Guideline added by authorized administrator", "guideline": new_g}

@app.post("/api/analyze")
def analyze_content(req: AnalyzeRequest):
    """
    Executes multi-layer Brand DNA inspection on provided text.
    Available to Creators, Reviewers, and Admins.
    """
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Content text cannot be empty.")
    
    result = scan_text(req.text, req.language or "English")
    return {
        "analyzed_at": datetime.datetime.now().isoformat(),
        "report": result
    }

@app.post("/api/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...), 
    language: str = Form("English"),
    x_user_role: Optional[str] = Header(default="creator")
):
    """
    PyMuPDF text extraction pipeline.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported by this endpoint.")
    
    pdf_bytes = await file.read()
    extracted = extract_text_from_pdf_bytes(pdf_bytes)
    analysis = scan_text(extracted["full_text"], language)

    return {
        "filename": file.filename,
        "pages_scanned": extracted["page_count"],
        "word_count": extracted["total_words"],
        "extracted_text_preview": extracted["full_text"][:500],
        "analysis_report": analysis
    }

@app.post("/api/simulate-rule")
def simulate_new_rule(
    req: SimulateRuleRequest,
    x_user_role: Optional[str] = Header(default="admin")
):
    """
    Innovation 1: Test My New Rules simulation endpoint.
    Restricted to Administrators.
    """
    if x_user_role != "admin":
        raise HTTPException(
            status_code=403, 
            detail="Forbidden: Innovation 1 simulation is an Admin-only governance feature."
        )

    rule_lower = req.proposed_rule.lower()
    affected_count = 2 if "guarantee" in rule_lower or "magic" in rule_lower else 1

    return {
        "proposed_rule": req.proposed_rule,
        "total_archive_scanned": 128,
        "projected_violations": affected_count,
        "affected_assets_count": affected_count,
        "severity_breakdown": {
            "Critical": 1 if "guarantee" in rule_lower else 0,
            "High": 1,
            "Medium": 0,
            "Low": 0
        },
        "sample_impacts": [
            {
                "asset_title": "Product Ad Banner — Q4 Launch",
                "violation_reason": "Contains term covered by proposed policy.",
                "recommended_change": "Update copy to conform to proposed rule draft."
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
