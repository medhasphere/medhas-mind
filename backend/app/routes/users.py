from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.user import UserResponse, UserUpdate, UserProfile
from app.utils.auth import get_current_user, get_current_admin
from app.services.user_service import UserService

router = APIRouter()
user_service = UserService()

@router.get("/profile", response_model=UserProfile)
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    """Get current user's profile with statistics"""
    profile = await user_service.get_user_profile_with_stats(current_user["user_id"])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/profile", response_model=UserResponse)
async def update_my_profile(
    update_data: UserUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update current user's profile"""
    updated_profile = await user_service.update_user_profile(current_user["user_id"], update_data)
    if not updated_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return updated_profile

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_profile(user_id: str, current_user: dict = Depends(get_current_user)):
    """Get user profile by ID"""
    profile = await user_service.get_user_by_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return profile

@router.get("/", response_model=List[UserResponse])
async def search_users(
    query: str = "",
    role: str = None,
    current_user: dict = Depends(get_current_admin)
):
    """Search users (admin only)"""
    if query:
        users = await user_service.search_users(query)
    elif role:
        from app.schemas.user import UserRole
        users = await user_service.get_users_by_role(UserRole(role))
    else:
        # Return empty list for now - implement pagination later
        users = []

    return users

# TODO: Add more user management endpoints
# - User deactivation/activation
# - Bulk operations
# - User statistics
# - Profile completion status