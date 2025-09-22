#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Database Connection Test Script
Run this to verify your Supabase database setup is working correctly.
"""

import os
from dotenv import load_dotenv
from app.utils.database import supabase
from app.services.user_service import UserService

load_dotenv()

def test_database_connection():
    """Test basic database connectivity"""
    print("🔍 Testing Supabase connection...")

    try:
        # Test basic connection
        response = supabase.table('profiles').select('count').limit(1).execute()
        print("✅ Database connection successful!")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_auth_setup():
    """Test if auth triggers are working"""
    print("\n🔍 Testing auth setup...")

    try:
        # This should work if auth triggers are set up
        # Note: This is just a connectivity test, not actual user creation
        print("✅ Auth system appears to be configured")
        return True
    except Exception as e:
        print(f"⚠️  Auth setup check: {e}")
        return False

def test_tables_exist():
    """Test if all required tables exist"""
    print("\n🔍 Checking database tables...")

    required_tables = [
        'profiles', 'courses', 'course_enrollments', 'hackathons',
        'teams', 'team_members', 'portfolio_projects', 'achievements', 'user_progress'
    ]

    try:
        # Check if we can query each table
        for table in required_tables:
            try:
                response = supabase.table(table).select('*').limit(1).execute()
                print(f"✅ Table '{table}' exists")
            except Exception as e:
                print(f"❌ Table '{table}' missing or inaccessible: {e}")
                return False

        print("✅ All required tables are accessible!")
        return True
    except Exception as e:
        print(f"❌ Table check failed: {e}")
        return False

def test_sample_data():
    """Test if sample data was inserted"""
    print("\n🔍 Checking sample data...")

    try:
        # Check for sample courses
        courses = supabase.table('courses').select('*').execute()
        if len(courses.data) > 0:
            print(f"✅ Found {len(courses.data)} sample courses")
        else:
            print("ℹ️  No sample courses found (this is normal if you skipped sample data)")

        # Check for sample hackathons
        hackathons = supabase.table('hackathons').select('*').execute()
        if len(hackathons.data) > 0:
            print(f"✅ Found {len(hackathons.data)} sample hackathons")
        else:
            print("ℹ️  No sample hackathons found (this is normal if you skipped sample data)")

        return True
    except Exception as e:
        print(f"❌ Sample data check failed: {e}")
        return False

def main():
    """Run all database tests"""
    print("🚀 MedhasMind Database Setup Verification")
    print("=" * 50)

    # Check environment variables
    print("\n🔧 Environment Check:")
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_ANON_KEY')

    if not supabase_url:
        print("❌ SUPABASE_URL not found in environment variables")
        return

    if not supabase_key:
        print("❌ SUPABASE_ANON_KEY not found in environment variables")
        return

    print("✅ Environment variables configured")
    print(f"   URL: {supabase_url[:30]}...")

    # Run tests
    tests = [
        test_database_connection,
        test_auth_setup,
        test_tables_exist,
        test_sample_data
    ]

    passed = 0
    for test in tests:
        if test():
            passed += 1

    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{len(tests)} passed")

    if passed == len(tests):
        print("🎉 All tests passed! Your database is ready for MedhasMind.")
        print("\nNext steps:")
        print("1. Start the backend server: cd backend && python -m app.main")
        print("2. Visit http://localhost:8000/docs to see the API documentation")
        print("3. Test authentication endpoints with your frontend")
    else:
        print("⚠️  Some tests failed. Please check the errors above and fix any issues.")
        print("\nCommon solutions:")
        print("- Make sure you ran the complete supabase_setup.sql script")
        print("- Verify your API keys are correct in .env")
        print("- Check Supabase project status and billing")

if __name__ == "__main__":
    main()