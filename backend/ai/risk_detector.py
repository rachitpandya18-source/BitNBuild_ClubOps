from pathlib import Path

from pydantic import BaseModel, Field

from backend.services.ai_service import generate_structured


class Risk(BaseModel):
    description: str
    severity: str
    reason: str
    suggested_action: str


class RiskAnalysis(BaseModel):
    risks: list[Risk] = Field(default_factory=list)


def _load_prompt() -> str:
    """Load the risk analysis prompt from the prompts directory."""

    prompt_path = (
        Path(__file__).resolve().parent.parent
        / "prompts"
        / "risk_analysis.txt"
    )

    if not prompt_path.exists():
        raise FileNotFoundError(
            f"Risk analysis prompt not found: {prompt_path}"
        )

    return prompt_path.read_text(encoding="utf-8")


def detect_risks(information: str) -> RiskAnalysis:
    """
    Analyze event or meeting information and identify operational risks.
    """

    if not information or not information.strip():
        raise ValueError("Event or meeting information cannot be empty")

    prompt_template = _load_prompt()

    prompt = f"{prompt_template}\n{information.strip()}"

    try:
        return generate_structured(prompt, RiskAnalysis)

    except Exception as e:
        raise RuntimeError(
            f"Risk detection failed: {str(e)}"
        ) from e