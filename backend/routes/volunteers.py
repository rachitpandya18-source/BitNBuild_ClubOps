from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Event, Volunteer
from schemas import (
    VolunteerCreate,
    VolunteerResponse,
    VolunteerUpdate,
)

router = APIRouter(prefix="/api", tags=["Volunteers"])


@router.post(
    "/events/{event_id}/volunteers",
    response_model=VolunteerResponse
)
def create_volunteer(
    event_id: int,
    volunteer_data: VolunteerCreate,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    volunteer = Volunteer(
        event_id=event_id,
        name=volunteer_data.name,
        email=volunteer_data.email,
        role=volunteer_data.role,
        availability=volunteer_data.availability,
    )

    db.add(volunteer)
    db.commit()
    db.refresh(volunteer)

    return volunteer


@router.get(
    "/events/{event_id}/volunteers",
    response_model=list[VolunteerResponse]
)
def get_event_volunteers(
    event_id: int,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return db.query(Volunteer).filter(
        Volunteer.event_id == event_id
    ).all()


@router.get(
    "/volunteers/{volunteer_id}",
    response_model=VolunteerResponse
)
def get_volunteer(
    volunteer_id: int,
    db: Session = Depends(get_db)
):
    volunteer = db.query(Volunteer).filter(
        Volunteer.id == volunteer_id
    ).first()

    if volunteer is None:
        raise HTTPException(
            status_code=404,
            detail="Volunteer not found"
        )

    return volunteer


@router.put(
    "/volunteers/{volunteer_id}",
    response_model=VolunteerResponse
)
def update_volunteer(
    volunteer_id: int,
    volunteer_data: VolunteerUpdate,
    db: Session = Depends(get_db)
):
    volunteer = db.query(Volunteer).filter(
        Volunteer.id == volunteer_id
    ).first()

    if volunteer is None:
        raise HTTPException(
            status_code=404,
            detail="Volunteer not found"
        )

    update_data = volunteer_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(volunteer, field, value)

    db.commit()
    db.refresh(volunteer)

    return volunteer


@router.delete("/volunteers/{volunteer_id}")
def delete_volunteer(
    volunteer_id: int,
    db: Session = Depends(get_db)
):
    volunteer = db.query(Volunteer).filter(
        Volunteer.id == volunteer_id
    ).first()

    if volunteer is None:
        raise HTTPException(
            status_code=404,
            detail="Volunteer not found"
        )

    db.delete(volunteer)
    db.commit()

    return {"message": "Volunteer deleted successfully"}