from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from schemas import TaskResponse
from services.task_service import create_task_from_ai


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

class MeetingTaskCreationRequest(BaseModel):
    event_id: int
    notes: str

class MeetingTaskCreationResponse(BaseModel):
    message: str
    event_id: int
    tasks_created: int
    tasks: list[TaskResponse]

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

@router.post(
    "/analyze-meeting-and-create-tasks",
    response_model=MeetingTaskCreationResponse
)
def analyze_meeting_and_create_tasks(
    request: MeetingTaskCreationRequest,
    db: Session = Depends(get_db),
):
    try:
        analysis = analyze_meeting(request.notes)

        created_tasks = []

        for task_data in analysis.tasks:
            task = create_task_from_ai(
                db=db,
                event_id=request.event_id,
                title=task_data.title,
                owner=task_data.owner,
                deadline=task_data.deadline,
                priority=task_data.priority,
            )

            created_tasks.append(task)

        return {
            "message": "Meeting analyzed and tasks created successfully",
            "event_id": request.event_id,
            "tasks_created": len(created_tasks),
            "tasks": created_tasks,
        }

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