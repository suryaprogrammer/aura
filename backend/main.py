from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from backend.core.config import settings
from backend.database.session import Base, engine
from backend.routes.auth import router as auth_router
from backend.routes.ai import router as ai_router

# Create database tables automatically upon app startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "AURA — Personal Operating System Backend API (FastAPI + SQLAlchemy + SQLite)\n\n"
        "## Authentication\n"
        "1. Call **POST /api/auth/signup** or **POST /api/auth/login** to receive a JWT.\n"
        "2. Click the **Authorize 🔒** button at the top of this page.\n"
        "3. Enter `<your_token>` (without the `Bearer` prefix — Swagger adds it automatically).\n"
        "4. All protected AI endpoints will now include the `Authorization: Bearer …` header."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for mobile apps (Expo, Android emulator, and local web tools)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {
        "app": "AURA",
        "tagline": "Your Personal Operating System",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "aura-backend",
        "database": "sqlite",
        "version": "1.0.0"
    }

def custom_openapi():
    """
    Override FastAPI's default OpenAPI schema to inject the BearerAuth HTTP
    security scheme. This makes Swagger UI render the 'Authorize 🔒' button
    and automatically attach 'Authorization: Bearer <token>' to requests.

    No authentication logic is changed — this is purely a documentation/UI fix.
    """
    if app.openapi_schema:
        return app.openapi_schema

    schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    # Declare the Bearer HTTP security schemes.
    # FastAPI auto-tags protected endpoints with "HTTPBearer" (generated from
    # the HTTPBearer dependency).  We must declare that scheme so Swagger can
    # resolve it.  We also add "BearerAuth" as a canonical named alias so the
    # Authorize dialog shows a clear, descriptive label.
    schema.setdefault("components", {})
    schema["components"]["securitySchemes"] = {
        # Matches what FastAPI generates for endpoints using HTTPBearer dependency
        "HTTPBearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": (
                "JWT Bearer token. "
                "Obtain from POST /api/auth/signup or POST /api/auth/login. "
                "Paste the token value only — do NOT include the 'Bearer' prefix."
            ),
        },
        # Canonical descriptive alias shown in Swagger's Authorize dialog
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": (
                "Paste your JWT token (without the 'Bearer' prefix). "
                "Obtain it from POST /api/auth/signup or POST /api/auth/login."
            ),
        },
    }

    # Apply the scheme globally so every endpoint shows the lock icon.
    # Public endpoints (signup, login, health) still work unauthenticated —
    # this only affects Swagger UI rendering, not actual enforcement.
    for path_item in schema.get("paths", {}).values():
        for operation in path_item.values():
            if isinstance(operation, dict):
                operation.setdefault("security", [{"BearerAuth": []}])

    app.openapi_schema = schema
    return app.openapi_schema


app.openapi = custom_openapi  # type: ignore[method-assign]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
