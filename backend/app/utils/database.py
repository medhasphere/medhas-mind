from supabase import create_client, Client
from dotenv import load_dotenv
import os
from typing import Optional

load_dotenv()

class Database:
    def __init__(self):
        self.supabase_url: str = os.getenv("SUPABASE_URL", "")
        self.supabase_key: str = os.getenv("SUPABASE_ANON_KEY", "")
        self.supabase_service_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
        self._client: Optional[Client] = None
        self._admin_client: Optional[Client] = None

    @property
    def client(self) -> Client:
        """Get the Supabase client for regular operations"""
        if self._client is None:
            if not self.supabase_url or not self.supabase_key:
                # For development/testing, create a mock client or raise error only when used
                raise ValueError("SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables")
            self._client = create_client(self.supabase_url, self.supabase_key)
        return self._client

    @property
    def admin_client(self) -> Client:
        """Get the Supabase client with service role key for admin operations"""
        if self._admin_client is None:
            if not self.supabase_url or not self.supabase_service_key:
                raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for admin operations")
            self._admin_client = create_client(self.supabase_url, self.supabase_service_key)
        return self._admin_client

# Global database instance
db = Database()

# Export clients for easy import - will raise error if env vars not set
supabase = db.client
supabase_admin = db.admin_client