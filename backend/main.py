from fastapi import FastAPI

from database import Base, engine
import models

from routes.events import router as events_router
from routes.tasks import router as tasks_router
from routes.ai import router as ai_router

app = FastAPI(
    title="ClubOps AI API",
    description="Backend API for ClubOps AI",
    version="0.1.0",
)

Base.metadata.create_all(bind=engine)

app.include_router(events_router)
app.include_router(tasks_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {
        "message": "ClubOps AI API is running",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }