import os
from typing import Type, TypeVar

from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel


load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in .env")


client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.6-flash"


T = TypeVar("T", bound=BaseModel)


def generate_text(prompt: str) -> str:
    """
    Send a prompt to Gemini and return plain text.
    """

    if not prompt or not prompt.strip():
        raise ValueError("Prompt cannot be empty")

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        if not response.text:
            raise RuntimeError("Gemini returned an empty response")

        return response.text.strip()

    except Exception as e:
        raise RuntimeError(
            f"Gemini API error: {str(e)}"
        ) from e


def generate_structured(prompt: str, schema: Type[T]) -> T:
    """
    Generate a response from Gemini that follows a Pydantic schema.
    """

    if not prompt or not prompt.strip():
        raise ValueError("Prompt cannot be empty")

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=schema,
            ),
        )

        if not response.text:
            raise RuntimeError("Gemini returned an empty response")

        return schema.model_validate_json(response.text)

    except Exception as e:
        raise RuntimeError(
            f"Gemini structured API error: {str(e)}"
        ) from e