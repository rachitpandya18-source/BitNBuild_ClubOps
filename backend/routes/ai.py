from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ai.meeting_analyzer import (
    MeetingAnalysis,
    analyze_meeting,
)
from ai.risk_detector import (
    RiskAnalysis,
    detect_risks,
)
from ai.announcement_generator import (
    Announcement,
    generate_announcement,
)


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


class MeetingAnalysisRequest(BaseModel):
    notes: str


class RiskAnalysisRequest(BaseModel):
    information: str


class AnnouncementRequest(BaseModel):
    event_information: str


@router.post(
    "/analyze-meeting",
    response_model=MeetingAnalysis,
)
def analyze_meeting_endpoint(
    request: MeetingAnalysisRequest,
):
    """
    Analyze meeting notes and extract tasks,
    decisions, risks, and summary.
    """

    try:
        return analyze_meeting(request.notes)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except RuntimeError as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )


@router.post(
    "/detect-risks",
    response_model=RiskAnalysis,
)
def detect_risks_endpoint(
    request: RiskAnalysisRequest,
):
    """
    Detect operational risks from event or meeting information.
    """

    try:
        return detect_risks(request.information)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except RuntimeError as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )


@router.post(
    "/generate-announcement",
    response_model=Announcement,
)
def generate_announcement_endpoint(
    request: AnnouncementRequest,
):
    """
    Generate a structured event announcement.
    """

    try:
        return generate_announcement(
            request.event_information
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except RuntimeError as e:
        raise HTTPException(
            status_code=502,
            detail=str(e),
        )