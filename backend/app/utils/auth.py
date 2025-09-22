from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from app.schemas.user import UserRole, TokenData
from app.utils.database import supabase

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", 30))

security = HTTPBearer()

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        role: str = payload.get("role")

        if user_id is None or email is None:
            raise JWTError("Invalid token")

        return TokenData(user_id=user_id, email=email, role=UserRole(role))
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    """Dependency to get current authenticated user"""
    token = credentials.credentials
    return verify_token(token)

async def get_current_student(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Dependency to ensure user is a student"""
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions. Student access required."
        )
    return current_user

async def get_current_partner(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Dependency to ensure user is a partner"""
    if current_user.role != UserRole.PARTNER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions. Partner access required."
        )
    return current_user

async def get_current_admin(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Dependency to ensure user is an admin"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions. Admin access required."
        )
    return current_user

def verify_supabase_token(token: str) -> dict:
    """Verify Supabase JWT token"""
    try:
        # Supabase uses RS256, but we'll use HS256 for simplicity
        # In production, you'd verify against Supabase's public key
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Verify token hasn't expired
        exp = payload.get('exp')
        if exp and datetime.utcnow().timestamp() > exp:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )

        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Supabase token"
        )