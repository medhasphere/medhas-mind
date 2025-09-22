-- =========================================
-- MedhasMind Database Setup for Supabase
-- =========================================
-- Run this script in your Supabase SQL Editor
-- =========================================

-- Note: Row Level Security is enabled per-table, not globally
-- JWT secrets are configured in Supabase Auth settings, not via SQL

-- =========================================
-- 1. PROFILES TABLE (extends auth.users)
-- =========================================

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'partner', 'admin')),
    user_type TEXT DEFAULT 'student' CHECK (user_type IN ('student', 'partner')),
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

    -- Profile statistics (optional, can be computed from other tables)
    total_courses INTEGER DEFAULT 0,
    completed_courses INTEGER DEFAULT 0,
    total_hours INTEGER DEFAULT 0,
    hackathons_participated INTEGER DEFAULT 0,
    hackathons_won INTEGER DEFAULT 0,
    badges_earned INTEGER DEFAULT 0,
    skill_level TEXT DEFAULT 'beginner' CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),

    PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =========================================
-- 2. COURSES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    duration_hours INTEGER DEFAULT 0,
    instructor_id UUID REFERENCES profiles(id),
    tags TEXT[], -- Array of tags like ['python', 'machine-learning']
    prerequisites TEXT[],
    learning_objectives TEXT[],
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
DROP POLICY IF EXISTS "Instructors can manage their courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage all courses" ON courses;

-- Policies for courses
CREATE POLICY "Anyone can view published courses" ON courses
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Instructors can manage their courses" ON courses
    FOR ALL USING (instructor_id = auth.uid());

CREATE POLICY "Admins can manage all courses" ON courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =========================================
-- 3. COURSE ENROLLMENTS
-- =========================================

CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    current_lesson TEXT,
    time_spent_minutes INTEGER DEFAULT 0,

    UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON course_enrollments;
DROP POLICY IF EXISTS "Users can enroll themselves" ON course_enrollments;
DROP POLICY IF EXISTS "Users can update their own progress" ON course_enrollments;

-- Policies
CREATE POLICY "Users can view their own enrollments" ON course_enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll themselves" ON course_enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON course_enrollments
    FOR UPDATE USING (auth.uid() = user_id);

-- =========================================
-- 4. HACKATHONS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS hackathons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    theme TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    max_team_size INTEGER DEFAULT 4,
    min_team_size INTEGER DEFAULT 1,
    difficulty TEXT DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    prizes JSONB, -- Store prize information as JSON
    rules TEXT[],
    technologies TEXT[], -- Required/suggested technologies
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active hackathons" ON hackathons;
DROP POLICY IF EXISTS "Partners can create hackathons" ON hackathons;
DROP POLICY IF EXISTS "Creators can update their hackathons" ON hackathons;
DROP POLICY IF EXISTS "Admins can manage all hackathons" ON hackathons;

-- Policies
CREATE POLICY "Anyone can view active hackathons" ON hackathons
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Partners can create hackathons" ON hackathons
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('partner', 'admin')
        )
    );

CREATE POLICY "Creators can update their hackathons" ON hackathons
    FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Admins can manage all hackathons" ON hackathons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =========================================
-- 5. TEAMS TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
    leader_id UUID REFERENCES profiles(id),
    description TEXT,
    technologies TEXT[],
    looking_for_members BOOLEAN DEFAULT FALSE,
    max_members INTEGER DEFAULT 4,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(name, hackathon_id)
);

-- =========================================
-- 6. TEAM MEMBERS
-- =========================================

CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- leader, member, mentor
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(team_id, user_id)
);

-- =========================================
-- 7. PORTFOLIO PROJECTS
-- =========================================

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[],
    github_url TEXT,
    live_url TEXT,
    images TEXT[], -- Array of image URLs
    featured BOOLEAN DEFAULT FALSE,
    project_type TEXT DEFAULT 'personal', -- personal, hackathon, academic
    hackathon_id UUID REFERENCES hackathons(id), -- If it's a hackathon project
    team_id UUID REFERENCES teams(id), -- If it's a team project
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view published projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Users can manage their own projects" ON portfolio_projects;

-- Policies
CREATE POLICY "Anyone can view published projects" ON portfolio_projects
    FOR SELECT USING (TRUE); -- Public portfolio

CREATE POLICY "Users can manage their own projects" ON portfolio_projects
    FOR ALL USING (auth.uid() = user_id);

-- =========================================
-- 8. ACHIEVEMENTS/BADGES
-- =========================================

CREATE TABLE IF NOT EXISTS achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL, -- course_completed, hackathon_won, etc.
    title TEXT NOT NULL,
    description TEXT,
    badge_icon TEXT,
    points INTEGER DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own achievements" ON achievements;
DROP POLICY IF EXISTS "System can create achievements" ON achievements;

-- Policies
CREATE POLICY "Users can view their own achievements" ON achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create achievements" ON achievements
    FOR INSERT WITH CHECK (TRUE); -- Allow triggers/functions to create achievements

-- =========================================
-- 9. ANALYTICS/PROGRESS TRACKING
-- =========================================

CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- course_view, hackathon_join, etc.
    activity_id UUID, -- Reference to course, hackathon, etc.
    metadata JSONB, -- Additional data like time_spent, score, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can create their own progress records" ON user_progress;

-- Policies
CREATE POLICY "Users can view their own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress records" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =========================================
-- 10. FUNCTIONS AND TRIGGERS
-- =========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hackathons_updated_at BEFORE UPDATE ON hackathons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON portfolio_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- 11. INDEXES FOR PERFORMANCE
-- =========================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);

-- Courses indexes
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_difficulty ON courses(difficulty);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);

-- Course enrollments indexes
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_progress ON course_enrollments(progress_percentage);

-- Hackathons indexes
CREATE INDEX IF NOT EXISTS idx_hackathons_dates ON hackathons(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_hackathons_active ON hackathons(is_active);
CREATE INDEX IF NOT EXISTS idx_hackathons_created_by ON hackathons(created_by);

-- Teams indexes
CREATE INDEX IF NOT EXISTS idx_teams_hackathon ON teams(hackathon_id);
CREATE INDEX IF NOT EXISTS idx_teams_leader ON teams(leader_id);

-- Portfolio indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON portfolio_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_hackathon ON portfolio_projects(hackathon_id);

-- Achievements indexes
CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_type ON achievements(achievement_type);

-- Progress indexes
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_activity ON user_progress(activity_type);
CREATE INDEX IF NOT EXISTS idx_progress_created ON user_progress(created_at);

-- =========================================
-- CONTACT MESSAGES TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    inquiry_type TEXT DEFAULT 'general' CHECK (inquiry_type IN ('general', 'support', 'partnership', 'technical', 'feedback')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can view all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can update contact messages" ON contact_messages;

-- Policies - Allow anyone to insert (for contact form), only admins can read
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view all contact messages" ON contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update contact messages" ON contact_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =========================================
-- 12. SAMPLE DATA (Optional - for testing)
-- =========================================

-- Insert sample courses
INSERT INTO courses (title, description, category, difficulty, duration_hours, tags, learning_objectives, is_published) VALUES
('Full Stack Web Development', 'Learn to build modern web applications with React and Node.js', 'Web Development', 'intermediate', 40,
 ARRAY['react', 'nodejs', 'javascript', 'mongodb'], ARRAY['Build responsive UIs with React', 'Create REST APIs with Node.js', 'Implement authentication'], TRUE),

('Machine Learning Basics', 'Introduction to machine learning concepts and algorithms', 'Data Science', 'beginner', 25,
 ARRAY['python', 'machine-learning', 'tensorflow'], ARRAY['Understand ML fundamentals', 'Implement basic algorithms', 'Use TensorFlow for model training'], TRUE),

('Mobile App Development', 'Build native mobile apps with React Native', 'Mobile Development', 'intermediate', 35,
 ARRAY['react-native', 'javascript', 'ios', 'android'], ARRAY['Create cross-platform mobile apps', 'Implement navigation', 'Integrate APIs'], TRUE),

('Cloud Computing Fundamentals', 'Learn cloud platforms and deployment strategies', 'DevOps', 'beginner', 20,
 ARRAY['aws', 'docker', 'kubernetes'], ARRAY['Deploy applications to the cloud', 'Use containerization', 'Implement CI/CD pipelines'], TRUE);

-- Insert sample hackathon
INSERT INTO hackathons (title, description, theme, start_date, end_date, registration_deadline, difficulty, prizes, rules, technologies, is_active) VALUES
('AI Innovation Challenge', 'Build the next generation of AI-powered applications', 'Artificial Intelligence',
 '2024-10-01 09:00:00+00', '2024-10-03 17:00:00+00', '2024-09-25 23:59:00+00', 'advanced',
 '{"first": 50000, "second": 30000, "third": 20000}',
 ARRAY['Teams can have 2-4 members', 'All code must be original', 'Projects must use AI/ML'],
 ARRAY['python', 'tensorflow', 'react', 'nodejs'], TRUE);

-- =========================================
-- 13. ENABLE ROW LEVEL SECURITY & POLICIES
-- =========================================
-- Note: Policies are created after all tables exist to avoid dependency issues

-- Teams RLS and Policies
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Team members can view their teams" ON teams;
DROP POLICY IF EXISTS "Anyone can create teams for active hackathons" ON teams;
DROP POLICY IF EXISTS "Team leaders can update their teams" ON teams;

CREATE POLICY "Team members can view their teams" ON teams
    FOR SELECT USING (
        leader_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM team_members
            WHERE team_id = teams.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can create teams for active hackathons" ON teams
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM hackathons
            WHERE id = hackathon_id AND is_active = TRUE
        )
    );

CREATE POLICY "Team leaders can update their teams" ON teams
    FOR UPDATE USING (leader_id = auth.uid());

-- Team Members RLS and Policies
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Team members can view team membership" ON team_members;
DROP POLICY IF EXISTS "Users can join teams" ON team_members;
DROP POLICY IF EXISTS "Team leaders can manage members" ON team_members;

CREATE POLICY "Team members can view team membership" ON team_members
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM team_members tm
            WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can join teams" ON team_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Team leaders can manage members" ON team_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM teams
            WHERE id = team_id AND leader_id = auth.uid()
        )
    );

-- =========================================
-- SETUP COMPLETE
-- =========================================

-- Verify setup
SELECT 'Database setup completed successfully!' as status;