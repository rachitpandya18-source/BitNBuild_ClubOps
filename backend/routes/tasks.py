from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Event, Task
from schemas import TaskCreate, TaskResponse, TaskUpdate


router = APIRouter(
    prefix="/api",
    tags=["Tasks"]
)


@router.post(
    "/events/{event_id}/tasks",
    response_model=TaskResponse
)
def create_task(
    event_id: int,
    task_data: TaskCreate,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    task = Task(
        event_id=event_id,
        title=task_data.title,
        description=task_data.description,
        owner=task_data.owner,
        deadline=task_data.deadline,
        priority=task_data.priority,
        status=task_data.status,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.get(
    "/events/{event_id}/tasks",
    response_model=list[TaskResponse]
)
def get_event_tasks(
    event_id: int,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return db.query(Task).filter(
        Task.event_id == event_id
    ).all()


@router.get(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


@router.put(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    update_data = task_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully"
    }