from sqlalchemy.orm import Session

from models import Event, Task


def create_task_from_ai(
    db: Session,
    event_id: int,
    title: str,
    owner: str | None = None,
    deadline: str | None = None,
    priority: str = "medium",
    description: str | None = None,
) -> Task:
    event = db.query(Event).filter(Event.id == event_id).first()

    if event is None:
        raise ValueError("Event not found")

    task = Task(
        event_id=event_id,
        title=title,
        description=description,
        owner=owner,
        deadline=deadline,
        priority=priority,
        status="pending",
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task