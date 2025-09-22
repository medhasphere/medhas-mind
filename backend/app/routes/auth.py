from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Dict, Any
from datetime import timedelta

from app.schemas.user import (
    SignupRequest,
    LoginRequest,
    AuthResponse,
    UserResponse,
    PasswordResetRequest,
    PasswordResetConfirm,
    UserRole,
    UserType
)
from app.utils.auth import create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from app.utils.database import supabase, supabase_admin
from app.services.user_service import UserService

router = APIRouter()
user_service = UserService()

@router.post("/signup", response_model=AuthResponse)
async def signup(user_data: SignupRequest) -> AuthResponse:
    """Register a new user (student or partner)"""
    try:
        # Check if user already exists
        existing_user = await user_service.get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        # Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password,
            "options": {
                "data": {
                    "name": user_data.name,
                    "user_type": user_data.user_type,
                    "role": UserRole.STUDENT if user_data.user_type == UserType.STUDENT else UserRole.PARTNER
                }
            }
        })

        if auth_response.user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user account"
            )

        # Create user profile in database
        user_profile = await user_service.create_user_profile({
            "id": auth_response.user.id,
            "email": user_data.email,
            "name": user_data.name,
            "role": UserRole.STUDENT if user_data.user_type == UserType.STUDENT else UserRole.PARTNER,
            "user_type": user_data.user_type
        })

        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "sub": auth_response.user.id,
                "email": user_data.email,
                "role": user_profile.role
            },
            expires_delta=access_token_expires
        )

        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=user_profile
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Signup failed: {str(e)}"
        )

@router.post("/login", response_model=AuthResponse)
async def login(credentials: LoginRequest) -> AuthResponse:
    """Authenticate user and return access token"""
    try:
        # Sign in with Supabase Auth
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })

        if auth_response.user is None or auth_response.session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Get user profile
        user_profile = await user_service.get_user_by_id(auth_response.user.id)
        if not user_profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found"
            )

        # Update last login
        await user_service.update_last_login(auth_response.user.id)

        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "sub": auth_response.user.id,
                "email": credentials.email,
                "role": user_profile.role
            },
            expires_delta=access_token_expires
        )

        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=user_profile
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Login failed"
        )

@router.post("/logout")
async def logout(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Logout user by invalidating session"""
    try:
        # Sign out from Supabase
        supabase.auth.sign_out()
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )

@router.post("/refresh-token")
async def refresh_token(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Refresh access token"""
    try:
        # Get user profile
        user_profile = await user_service.get_user_by_id(current_user["user_id"])

        # Create new access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "sub": current_user["user_id"],
                "email": current_user["email"],
                "role": user_profile.role
            },
            expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed"
        )

@router.post("/reset-password")
async def reset_password(request: PasswordResetRequest):
    """Request password reset"""
    try:
        # Send password reset email via Supabase
        supabase.auth.reset_password_email(
            email=request.email,
            options={
                "redirect_to": "http://localhost:3000/reset-password"  # Update with your frontend URL
            }
        )
        return {"message": "Password reset email sent"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send password reset email"
        )

@router.post("/confirm-reset-password")
async def confirm_reset_password(data: PasswordResetConfirm):
    """Confirm password reset with token"""
    try:
        # Update password using Supabase
        supabase.auth.update_user({
            "password": data.new_password
        })
        return {"message": "Password updated successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update password"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Get current user profile"""
    user_profile = await user_service.get_user_by_id(current_user["user_id"])
    if not user_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    return user_profile