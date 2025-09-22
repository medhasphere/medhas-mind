// API client for MedhasMind backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

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
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = this.getAuthToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.detail || data.message || 'An error occurred',
        }
      }

      return { data }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        error: 'Network error or server unavailable',
      }
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  private setAuthToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('auth_token', token)
  }

  private removeAuthToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('auth_token')
  }

  // Authentication endpoints
  async signup(userData: {
    email: string
    password: string
    name: string
    user_type: 'student' | 'partner'
  }): Promise<ApiResponse<AuthResponse>> {
    const result = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    if (result.data?.access_token) {
      this.setAuthToken(result.data.access_token)
    }

    return result
  }

  async login(credentials: {
    email: string
    password: string
  }): Promise<ApiResponse<AuthResponse>> {
    const result = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (result.data?.access_token) {
      this.setAuthToken(result.data.access_token)
    }

    return result
  }

  async logout(): Promise<ApiResponse> {
    const result = await this.request('/auth/logout', {
      method: 'POST',
    })

    if (!result.error) {
      this.removeAuthToken()
    }

    return result
  }

  async refreshToken(): Promise<ApiResponse<{ access_token: string; token_type: string; expires_in: number }>> {
    const result = await this.request('/auth/refresh-token', {
      method: 'POST',
    })

    if (result.data?.access_token) {
      this.setAuthToken(result.data.access_token)
    }

    return result
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/users/profile')
  }

  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  }

  // Course endpoints
  async getCourses(params?: { category?: string; difficulty?: string; limit?: number }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append('category', params.category)
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty)
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return this.request<any[]>(`/courses${query ? `?${query}` : ''}`)
  }

  // Hackathon endpoints
  async getHackathons(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/hackathons')
  }

  // Analytics endpoints
  async getUserAnalytics(): Promise<ApiResponse<any>> {
    return this.request('/analytics/user')
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export types
export type { ApiResponse, AuthResponse, User }