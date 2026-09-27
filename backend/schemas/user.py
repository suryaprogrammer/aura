from datetime import datetime
from pydantic import BaseModel, Field, model_validator
import re

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=30, description="Alphanumeric username with underscores/hyphens")

    @model_validator(mode="before")
    @classmethod
    def validate_username_format(cls, data: dict):
        if isinstance(data, dict) and "username" in data:
            username = str(data["username"]).strip()
            if not re.match(r"^[a-zA-Z0-9_-]{3,30}$", username):
                raise ValueError("Username must be between 3 and 30 characters and contain only letters, numbers, underscores, and hyphens.")
            data["username"] = username
        return data

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=100, description="User password (min 6 characters)")
    confirm_password: str = Field(..., min_length=6, max_length=100, description="Password confirmation")

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match.")
        return self

class UserLogin(BaseModel):
    username: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1)

class UserResponse(BaseModel):
    id: int
    username: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class MessageResponse(BaseModel):
    message: str
