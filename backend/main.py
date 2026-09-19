from fastapi import FastAPI

from backend.routes.ai import router as ai_router


app = FastAPI(
    title="ClubOps AI",
    description="AI-powered event operations platform for college clubs",
    version="0.1.0"
)

app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "ClubOps AI backend is running",
        "status": "ok"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }