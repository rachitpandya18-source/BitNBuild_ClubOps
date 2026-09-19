from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EventBase(BaseModel):
    name: str
    description: str | None = None
    date: str | None = None
    venue: str | None = None
    status: str = "planning"


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class TaskBase(BaseModel):
    title: str
    description: str | None = None
    owner: str | None = None
    deadline: str | None = None
    priority: str = "medium"
    status: str = "pending"


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    owner: str | None = None
    deadline: str | None = None
    priority: str | None = None
    status: str | None = None


class TaskResponse(TaskBase):
    id: int
    event_id: int

    model_config = ConfigDict(from_attributes=True)