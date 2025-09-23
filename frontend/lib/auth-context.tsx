"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient, User } from './api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: { email: string; password: string; name: string; user_type: 'student' | 'partner'; company?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in on app start
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.getCurrentUser()
      if (response.data) {
        setUser(response.data)
      }
    } catch (error) {
      // User not authenticated
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password })
      if (response.data) {
        setUser(response.data.user)
        return { success: true }
      } else {
        return { success: false, error: response.error || 'Login failed' }
      }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  const signup = async (userData: { email: string; password: string; name: string; user_type: 'student' | 'partner'; company?: string; phone?: string }) => {
    try {
      const response = await apiClient.signup(userData)
      if (response.data) {
        setUser(response.data.user)
        return { success: true }
      } else {
        return { success: false, error: response.error || 'Signup failed' }
      }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const refreshUser = async () => {
    try {
      const response = await apiClient.getCurrentUser()
      if (response.data) {
        setUser(response.data)
      }
    } catch (error) {
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}