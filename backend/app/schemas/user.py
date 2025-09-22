from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    PARTNER = "partner"
    ADMIN = "admin"

class UserType(str, Enum):
    STUDENT = "student"
    PARTNER = "partner"

class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)
    role: UserRole = UserRole.STUDENT
    user_type: UserType = UserType.STUDENT
    avatar_url: Optional[str] = None
    bio: Optional[str] = Field(None, max_length=500)
    institution: Optional[str] = Field(None, max_length=100)
    location: Optional[str] = Field(None, max_length=100)
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    avatar_url: Optional[str] = None
    bio: Optional[str] = Field(None, max_length=500)
    institution: Optional[str] = Field(None, max_length=100)
    location: Optional[str] = Field(None, max_length=100)
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None

class UserInDB(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime
    last_login: Optional[datetime] = None
    is_active: bool = True
    email_confirmed: bool = False

class UserResponse(UserInDB):
    pass

class UserProfile(UserInDB):
    # Additional profile fields
    total_courses: int = 0
    completed_courses: int = 0
    total_hours: int = 0
    hackathons_participated: int = 0
    hackathons_won: int = 0
    badges_earned: int = 0
    skill_level: str = "beginner"  # beginner, intermediate, advanced, expert

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    user_type: UserType = UserType.STUDENT

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)

class TokenData(BaseModel):
    user_id: str
    email: str
    role: UserRole