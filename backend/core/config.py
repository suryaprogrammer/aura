import os
from typing import List
from pydantic_settings import BaseSettings


def _parse_cors_origins(raw: str) -> List[str]:
    """Parse a comma-separated CORS_ORIGINS env var into a list."""
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


_DEFAULT_CORS_ORIGINS = [
    "http://localhost:5173",    # Vite dev server
    "http://localhost:3000",    # CRA / alternative dev port
    "http://localhost:8081",    # Expo Metro bundler
    "http://localhost:19006",   # Expo Web
    "http://127.0.0.1:8000",    # Backend self-reference (dev)
]


class Settings(BaseSettings):
    PROJECT_NAME: str = "AURA — Personal Operating System API"
    API_V1_STR: str = "/api"

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./aura.db")

    # Security
    JWT_SECRET: str = os.getenv(
        "JWT_SECRET",
        "aura_development_secret_key_change_in_production_123456789",
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Gemini AI
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    # CORS — set CORS_ORIGINS env var to a comma-separated list of allowed
    # origins in production, e.g. "https://aura.vercel.app"
    CORS_ORIGINS: List[str] = _parse_cors_origins(
        os.getenv("CORS_ORIGINS", "")
    ) or _DEFAULT_CORS_ORIGINS

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()

