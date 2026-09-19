from pathlib import Path
from typing import Optional

from pydantic import BaseModel, Field

from backend.services.ai_service import generate_structured


class Task(BaseModel):
    title: str
    owner: Optional[str] = None
    deadline: Optional[str] = None
    priority: str = "medium"


class Risk(BaseModel):
    description: str
    severity: str
    suggested_action: str


class MeetingAnalysis(BaseModel):
    summary: str
    tasks: list[Task] = Field(default_factory=list)
    decisions: list[str] = Field(default_factory=list)
    risks: list[Risk] = Field(default_factory=list)


def _load_prompt() -> str:
    """Load the meeting analysis prompt from the prompts directory."""

    prompt_path = (
        Path(__file__).resolve().parent.parent
        / "prompts"
        / "meeting_analysis.txt"
    )

    if not prompt_path.exists():
        raise FileNotFoundError(
            f"Meeting analysis prompt not found: {prompt_path}"
        )

    return prompt_path.read_text(encoding="utf-8")


def analyze_meeting(notes: str) -> MeetingAnalysis:
    """
    Analyze meeting notes and extract structured information using Gemini.
    """

    if not notes or not notes.strip():
        raise ValueError("Meeting notes cannot be empty")

    prompt_template = _load_prompt()

    prompt = f"{prompt_template}\n{notes.strip()}"

    try:
        return generate_structured(prompt, MeetingAnalysis)

    except Exception as e:
        raise RuntimeError(
            f"Meeting analysis failed: {str(e)}"
        ) from e