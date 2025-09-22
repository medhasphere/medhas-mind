from typing import Optional, Dict, Any, List
from datetime import datetime
from app.utils.database import supabase, supabase_admin
from app.schemas.user import UserResponse, UserCreate, UserUpdate, UserProfile, UserRole

class UserService:
    async def get_user_by_id(self, user_id: str) -> Optional[UserResponse]:
        """Get user by ID"""
        try:
            response = supabase.table('profiles').select('*').eq('id', user_id).single().execute()
            if response.data:
                return UserResponse(**response.data)
            return None
        except Exception as e:
            print(f"Error getting user by ID: {e}")
            return None

    async def get_user_by_email(self, email: str) -> Optional[UserResponse]:
        """Get user by email"""
        try:
            response = supabase.table('profiles').select('*').eq('email', email).single().execute()
            if response.data:
                return UserResponse(**response.data)
            return None
        except Exception as e:
            print(f"Error getting user by email: {e}")
            return None

    async def create_user_profile(self, user_data: Dict[str, Any]) -> UserResponse:
        """Create user profile"""
        try:
            profile_data = {
                **user_data,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat(),
                "is_active": True,
                "email_confirmed": False
            }

            response = supabase.table('profiles').insert(profile_data).execute()
            return UserResponse(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create user profile: {str(e)}")

    async def update_user_profile(self, user_id: str, update_data: UserUpdate) -> Optional[UserResponse]:
        """Update user profile"""
        try:
            update_dict = update_data.dict(exclude_unset=True)
            update_dict["updated_at"] = datetime.utcnow().isoformat()

            response = supabase.table('profiles').update(update_dict).eq('id', user_id).execute()

            if response.data:
                return UserResponse(**response.data[0])
            return None
        except Exception as e:
            print(f"Error updating user profile: {e}")
            return None

    async def update_last_login(self, user_id: str) -> bool:
        """Update user's last login timestamp"""
        try:
            supabase.table('profiles').update({
                'last_login': datetime.utcnow().isoformat()
            }).eq('id', user_id).execute()
            return True
        except Exception as e:
            print(f"Error updating last login: {e}")
            return False

    async def get_user_profile_with_stats(self, user_id: str) -> Optional[UserProfile]:
        """Get user profile with statistics"""
        try:
            # Get basic profile
            profile = await self.get_user_by_id(user_id)
            if not profile:
                return None

            # Get user statistics (simplified - in real app, these would come from various tables)
            # For now, returning mock data - replace with actual queries
            profile_dict = profile.dict()
            profile_dict.update({
                "total_courses": 12,  # Replace with actual query
                "completed_courses": 8,  # Replace with actual query
                "total_hours": 156,  # Replace with actual query
                "hackathons_participated": 3,  # Replace with actual query
                "hackathons_won": 1,  # Replace with actual query
                "badges_earned": 24,  # Replace with actual query
                "skill_level": "intermediate"  # Replace with actual calculation
            })

            return UserProfile(**profile_dict)
        except Exception as e:
            print(f"Error getting user profile with stats: {e}")
            return None

    async def search_users(self, query: str, limit: int = 20) -> List[UserResponse]:
        """Search users by name or email"""
        try:
            response = supabase.table('profiles').select('*').or_(
                f"name.ilike.%{query}%,email.ilike.%{query}%"
            ).limit(limit).execute()

            return [UserResponse(**user) for user in response.data]
        except Exception as e:
            print(f"Error searching users: {e}")
            return []

    async def get_users_by_role(self, role: UserRole, limit: int = 50) -> List[UserResponse]:
        """Get users by role"""
        try:
            response = supabase.table('profiles').select('*').eq('role', role.value).limit(limit).execute()
            return [UserResponse(**user) for user in response.data]
        except Exception as e:
            print(f"Error getting users by role: {e}")
            return []

    async def deactivate_user(self, user_id: str) -> bool:
        """Deactivate user account"""
        try:
            supabase.table('profiles').update({
                'is_active': False,
                'updated_at': datetime.utcnow().isoformat()
            }).eq('id', user_id).execute()
            return True
        except Exception as e:
            print(f"Error deactivating user: {e}")
            return False

    async def activate_user(self, user_id: str) -> bool:
        """Activate user account"""
        try:
            supabase.table('profiles').update({
                'is_active': True,
                'updated_at': datetime.utcnow().isoformat()
            }).eq('id', user_id).execute()
            return True
        except Exception as e:
            print(f"Error activating user: {e}")
            return False