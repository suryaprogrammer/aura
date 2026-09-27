import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured")

client = Groq(api_key=GROQ_API_KEY)


def generate_ai_response(
    system_prompt: str,
    user_prompt: str,
) -> str:
    """
    Send a request to Groq and return the AI response.
    """

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
        temperature=0.4,
    )

    return response.choices[0].message.content or ""


def get_personal_coach(context: str) -> str:
    system_prompt = """
You are AURA, a practical personal AI coach.

Your job is to help the user with:
- daily priorities
- productivity
- fitness consistency
- AI engineering learning
- hackathon preparation
- financial habits
- savings
- personal organization

Important rules:
1. Never invent user data.
2. Never claim to modify the user's database.
3. Never make financial, fitness, or career decisions on behalf of the user.
4. Give practical and concise recommendations.
5. Use the supplied application data as context.
6. The application database and deterministic backend logic are the source of truth.
"""

    user_prompt = f"""
Analyze the following AURA application context and provide useful coaching.

AURA CONTEXT:
{context}

Give:
1. Today's top priorities
2. What the user is doing well
3. What needs attention
4. Three practical next actions
"""

    return generate_ai_response(system_prompt, user_prompt)


def create_study_plan(context: str) -> str:
    system_prompt = """
You are AURA's AI engineering study coach.

Create realistic learning plans based only on the supplied progress.
Do not invent completed skills.
Focus on practical coding, projects, revision, and consistency.
"""

    user_prompt = f"""
Create a practical AI engineering study plan from this AURA roadmap context:

{context}

Include:
- priority topics
- learning order
- practice tasks
- project work
- recommended daily focus
"""

    return generate_ai_response(system_prompt, user_prompt)


def get_hackathon_advice(context: str) -> str:
    system_prompt = """
You are AURA's hackathon strategy coach.

Help the user improve their hackathon execution, MVP,
technical implementation, demo, pitch, testing, and judge preparation.

Do not pretend that unfinished work is complete.
"""

    user_prompt = f"""
Analyze this hackathon tracker context:

{context}

Provide:
1. Current situation
2. Biggest risks
3. Highest-priority tasks
4. Demo/pitch improvements
5. Judge preparation advice
"""

    return generate_ai_response(system_prompt, user_prompt)


def summarize_text(text: str) -> str:
    system_prompt = """
You are AURA's summarization assistant.
Summarize the supplied text accurately and concisely.
Do not add information that is not present.
"""

    return generate_ai_response(
        system_prompt,
        f"Summarize the following text:\n\n{text}",
    )