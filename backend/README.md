# MedhasMind Backend API

A comprehensive backend API for MedhasMind - an AI-powered hackathon preparation platform built with FastAPI and Supabase.

## Features

- **Authentication & Authorization**: JWT-based auth with Supabase integration
- **User Management**: Student and partner profiles with role-based access control
- **Learning Management**: Course catalog, progress tracking, and personalized learning paths
- **Hackathon Simulation**: Real-time hackathon environments with AI teammates
- **Portfolio Management**: Project showcase with GitHub integration
- **Analytics**: Performance metrics and progress visualization
- **AI Integration**: Mentor chat, code analysis, and recommendation engine

## Tech Stack

- **Framework**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Pydantic
- **Documentation**: Auto-generated OpenAPI/Swagger

## Getting Started

### Prerequisites

- Python 3.8+
- Supabase account and project

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Supabase Database (see detailed instructions below)**
   - Create a Supabase project
   - Run the database setup script
   - Get your API keys

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

6. **Frontend environment** (in `../frontend/.env.local`):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up Supabase Database (see detailed instructions below)**

### Supabase Database Setup

#### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `medhasmind` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"

#### Step 2: Wait for Setup
- Supabase will take 1-2 minutes to set up your database
- You'll see a progress indicator

#### Step 3: Run Database Schema
1. Once your project is ready, go to the **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy and paste the entire contents of `supabase_setup.sql` into the query editor
4. Click "Run" to execute the script

**Notes**:
- The SQL script uses proper PostgreSQL array syntax (`ARRAY['item1', 'item2']`) instead of square brackets
- JWT configuration is handled through Supabase Auth settings, not SQL commands
- Row Level Security is enabled per-table for better security control
- Table creation and policy setup are separated to avoid dependency issues
- All tables are created first, then RLS policies are applied
- If you encounter any syntax errors, ensure you're using the latest version of the file

#### Step 4: Get API Keys
1. Go to **Settings** → **API** in the left sidebar
2. Copy the following values:
   - **Project URL**: This is your `SUPABASE_URL`
   - **anon/public key**: This is your `SUPABASE_ANON_KEY`
   - **service_role key**: This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

#### Step 5: Configure Authentication
1. Go to **Authentication** → **Settings** in the left sidebar
2. Update the following settings:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`

#### Step 6: Verify Setup
1. Go back to **SQL Editor**
2. Run this query to verify tables were created:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```
3. You should see all the tables: achievements, course_enrollments, courses, hackathons, portfolio_projects, profiles, team_members, teams, user_progress

#### Step 7: Test Database Connection
1. Update your `.env` file with the API keys from Step 4
2. Run the database verification script:
   ```bash
   cd backend && python test_db.py
   ```
3. This will check your connection, verify tables exist, and confirm sample data
4. Once verified, start the backend server:
   ```bash
   cd backend && python -m app.main
   ```
5. Check the console for any connection errors

### Alternative: Local Supabase (Optional)

If you prefer to run Supabase locally:

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Initialize local Supabase:
   ```bash
   supabase init
   supabase start
   ```

3. Run the setup script in your local database
4. Use local URLs in your `.env` file

### Troubleshooting

**Common Issues:**

1. **"relation 'profiles' does not exist"**
   - Make sure you ran the full `supabase_setup.sql` script
   - Check the SQL Editor for any error messages

2. **"Invalid API key"**
   - Double-check your API keys in Supabase Settings → API
   - Make sure you're using the correct keys (anon for frontend, service_role for backend admin operations)

3. **Authentication not working**
   - Verify Site URL and Redirect URLs in Authentication Settings
   - Check that your JWT secret matches between Supabase and your `.env`

4. **CORS errors**
   - Add your frontend URL to the allowed origins in Supabase Authentication Settings

### Database Schema Overview

The setup creates these main tables:

- **`profiles`**: Extended user information (extends `auth.users`)
- **`courses`**: Learning content and curricula
- **`course_enrollments`**: User progress in courses
- **`hackathons`**: Hackathon events and challenges
- **`teams`**: Team formations for hackathons
- **`team_members`**: Team membership relationships
- **`portfolio_projects`**: User project portfolios
- **`achievements`**: Badges and accomplishments
- **`user_progress`**: Analytics and activity tracking

All tables include Row Level Security (RLS) policies for data protection.

   Create the following tables in your Supabase database:

   ```sql
   -- Profiles table (extends auth.users)
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     email TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     role TEXT DEFAULT 'student',
     user_type TEXT DEFAULT 'student',
     avatar_url TEXT,
     bio TEXT,
     institution TEXT,
     location TEXT,
     linkedin_url TEXT,
     github_url TEXT,
     portfolio_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     last_login TIMESTAMP WITH TIME ZONE,
     is_active BOOLEAN DEFAULT TRUE,
     email_confirmed BOOLEAN DEFAULT FALSE,
     PRIMARY KEY (id)
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view their own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update their own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can insert their own profile" ON profiles
     FOR INSERT WITH CHECK (auth.uid() = id);
   ```

### Running the Application

**Development mode:**
```bash
python -m app.main
```

**Production mode:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/reset-password` - Password reset

### Users
- `GET /api/v1/users/profile` - Get current user profile
- `PUT /api/v1/users/profile` - Update user profile
- `GET /api/v1/users/{user_id}` - Get user by ID

### Courses (Coming Soon)
- Course catalog and enrollment
- Progress tracking
- Learning path recommendations

### Hackathons (Coming Soon)
- Hackathon management
- Team formation
- Real-time collaboration

### Portfolio (Coming Soon)
- Project management
- GitHub integration
- Template system

### Analytics (Coming Soon)
- Performance metrics
- Progress visualization
- Leaderboards

### AI Services (Coming Soon)
- AI mentor conversations
- Code analysis
- Recommendation engine

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── models/              # Database models (future)
│   ├── schemas/             # Pydantic schemas
│   │   └── user.py          # User schemas
│   ├── routes/              # API route handlers
│   │   ├── auth.py          # Authentication routes
│   │   ├── users.py         # User management routes
│   │   └── ...              # Other route modules
│   ├── services/            # Business logic services
│   │   └── user_service.py  # User service
│   ├── utils/               # Utility functions
│   │   ├── auth.py          # Authentication utilities
│   │   └── database.py      # Database configuration
│   └── tests/               # Unit and integration tests
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
# Install development dependencies
pip install black isort flake8

# Format code
black .
isort .

# Lint code
flake8 .
```

### Database Migrations
When making schema changes:
1. Update the SQL scripts in this README
2. Apply changes to your Supabase project
3. Update the corresponding Pydantic models

## Deployment

### Environment Variables for Production
Ensure these are set in your production environment:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET_KEY`
- `APP_ENV=production`
- `PORT` (optional, defaults to 8000)

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app/ ./app/

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.