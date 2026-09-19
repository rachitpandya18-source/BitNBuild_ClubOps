from pathlib import Path
from typing import Optional

from pydantic import BaseModel

from backend.services.ai_service import generate_structured


class Announcement(BaseModel):
    title: str
    message: str
    audience: Optional[str] = None
    tone: Optional[str] = None


def _load_prompt() -> str:
    """Load the announcement generation prompt."""

    prompt_path = (
        Path(__file__).resolve().parent.parent
        / "prompts"
        / "announcement.txt"
    )

    if not prompt_path.exists():
        raise FileNotFoundError(
            f"Announcement prompt not found: {prompt_path}"
        )

    return prompt_path.read_text(encoding="utf-8")


def generate_announcement(
    event_information: str,
) -> Announcement:
    """
    Generate a structured event announcement using Gemini.
    """

    if not event_information or not event_information.strip():
        raise ValueError("Event information cannot be empty")

    prompt_template = _load_prompt()

    prompt = f"{prompt_template}\n{event_information.strip()}"

    try:
        return generate_structured(prompt, Announcement)

    except Exception as e:
        raise RuntimeError(
            f"Announcement generation failed: {str(e)}"
        ) from e