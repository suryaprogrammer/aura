from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database.session import get_db
from backend.models.user import User
from backend.routes.auth import get_current_user
from backend.services.ai_service import (
    get_personal_coach,
    create_study_plan,
    get_hackathon_advice,
    summarize_text,
)

router = APIRouter(prefix="/api/ai", tags=["AI"])


class AIContextRequest(BaseModel):
    context: str


class SummarizeRequest(BaseModel):
    text: str


@router.post("/coach")
def personal_coach(
    request: AIContextRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        response = get_personal_coach(request.context)

        return {
            "success": True,
            "feature": "personal_coach",
            "response": response,
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"AI service unavailable: {str(e)}",
        )


@router.post("/study-plan")
def study_plan(
    request: AIContextRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        response = create_study_plan(request.context)

        return {
            "success": True,
            "feature": "study_plan",
            "response": response,
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"AI service unavailable: {str(e)}",
        )


@router.post("/hackathon-advice")
def hackathon_advice(
    request: AIContextRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        response = get_hackathon_advice(request.context)

        return {
            "success": True,
            "feature": "hackathon_advice",
            "response": response,
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"AI service unavailable: {str(e)}",
        )


@router.post("/summarize")
def summarize(
    request: SummarizeRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        response = summarize_text(request.text)

        return {
            "success": True,
            "feature": "summarize",
            "response": response,
        }

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"AI service unavailable: {str(e)}",
        )