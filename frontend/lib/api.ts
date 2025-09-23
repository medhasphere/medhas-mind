// Direct Supabase client for MedhasMind
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}

export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'partner' | 'admin'
  user_type: 'student' | 'partner'
  avatar_url?: string
  bio?: string
  institution?: string
  company?: string
  phone?: string
  location?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  created_at: string
  updated_at: string
  last_login?: string
  is_active: boolean
  email_confirmed: boolean
}

class ApiClient {
  // Authentication endpoints
  async signup(userData: {
    email: string
    password: string
    name: string
    user_type: 'student' | 'partner'
    company?: string
    phone?: string
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            user_type: userData.user_type,
            role: userData.user_type === 'student' ? 'student' : 'partner'
          }
        }
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        // Create profile in database
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: userData.email,
            name: userData.name,
            role: userData.user_type === 'student' ? 'student' : 'partner',
            user_type: userData.user_type,
            company: userData.company,
            phone: userData.phone
          })

        if (profileError) {
          return { error: profileError.message }
        }

        return {
          data: {
            access_token: data.session?.access_token || '',
            token_type: 'bearer',
            expires_in: 3600,
            user: {
              id: data.user.id,
              email: userData.email,
              name: userData.name,
              role: userData.user_type === 'student' ? 'student' : 'partner',
              user_type: userData.user_type,
              created_at: data.user.created_at,
              updated_at: data.user.updated_at || data.user.created_at,
              is_active: true,
              email_confirmed: data.user.email_confirmed_at ? true : false
            }
          }
        }
      }

      return { error: 'Signup failed' }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  async login(credentials: {
    email: string
    password: string
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          return { error: profileError.message }
        }

        return {
          data: {
            access_token: data.session?.access_token || '',
            token_type: 'bearer',
            expires_in: 3600,
            user: profile as User
          }
        }
      }

      return { error: 'Login failed' }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        return { error: error.message }
      }
      return { data: 'Logged out successfully' }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  async refreshToken(): Promise<ApiResponse<{ access_token: string; token_type: string; expires_in: number }>> {
    // Supabase handles token refresh automatically
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        return { error: error.message }
      }
      return {
        data: {
          access_token: session?.access_token || '',
          token_type: 'bearer',
          expires_in: 3600
        }
      }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) {
        return { error: authError.message }
      }

      if (!user) {
        return { error: 'Not authenticated' }
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: profile as User }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) {
        return { error: authError.message }
      }

      if (!user) {
        return { error: 'Not authenticated' }
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: data as User }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  // Course endpoints
  async getCourses(params?: { category?: string; difficulty?: string; limit?: number }): Promise<ApiResponse<any[]>> {
    try {
      let query = supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)

      if (params?.category) {
        query = query.eq('category', params.category)
      }
      if (params?.difficulty) {
        query = query.eq('difficulty', params.difficulty)
      }
      if (params?.limit) {
        query = query.limit(params.limit)
      }

      const { data, error } = await query

      if (error) {
        return { error: error.message }
      }

      return { data: data || [] }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  // Hackathon endpoints
  async getHackathons(): Promise<ApiResponse<any[]>> {
    try {
      const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .eq('is_active', true)

      if (error) {
        return { error: error.message }
      }

      return { data: data || [] }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  // Analytics endpoints
  async getUserAnalytics(): Promise<ApiResponse<any>> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) {
        return { error: authError.message }
      }

      if (!user) {
        return { error: 'Not authenticated' }
      }

      // Get user's course enrollments
      const { data: enrollments, error: enrollError } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', user.id)

      if (enrollError) {
        return { error: enrollError.message }
      }

      // Get user's achievements
      const { data: achievements, error: achieveError } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)

      if (achieveError) {
        return { error: achieveError.message }
      }

      return {
        data: {
          total_enrollments: enrollments?.length || 0,
          completed_courses: enrollments?.filter((e: any) => e.completed_at).length || 0,
          achievements: achievements || []
        }
      }
    } catch (error) {
      return { error: 'Network error' }
    }
  }

  // Contact endpoints
  async submitContactMessage(contactData: {
    name: string
    email: string
    subject: string
    message: string
    inquiry_type: string
  }): Promise<ApiResponse<{ id: string }>> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          name: contactData.name,
          email: contactData.email,
          subject: contactData.subject,
          message: contactData.message,
          inquiry_type: contactData.inquiry_type
        })
        .select('id')
        .single()

      if (error) {
        return { error: error.message }
      }

      return { data: data as { id: string } }
    } catch (error) {
      return { error: 'Network error' }
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()