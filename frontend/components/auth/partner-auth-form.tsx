"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Eye, EyeOff, Mail, Lock, User, Building, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"

interface PartnerAuthFormProps {
  onClose: () => void
  onAuthSuccess?: (user: any) => void
}

export function PartnerAuthForm({ onClose, onAuthSuccess }: PartnerAuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isLogin) {
        // Login
        const response = await apiClient.login({
          email: formData.email,
          password: formData.password,
        })

        if (response.error) {
          setError(response.error)
        } else if (response.data) {
          onAuthSuccess?.(response.data.user)
          onClose()
        }
      } else {
        // Signup
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }

        const response = await apiClient.signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          user_type: "partner",
        })

        if (response.error) {
          setError(response.error)
        } else if (response.data) {
          onAuthSuccess?.(response.data.user)
          onClose()
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <DialogHeader className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          {isLogin ? "Welcome Back, Partner!" : "Join as Partner"}
        </DialogTitle>
        <p className="text-gray-600 dark:text-gray-400">
          {isLogin ? "Sign in to your partner dashboard" : "Join our collaboration network as a partner"}
        </p>
      </DialogHeader>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required={!isLogin}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Company/Organization
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required={!isLogin}
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required={!isLogin}
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isLogin ? "Signing In..." : "Creating Account..."}
            </>
          ) : (
            isLogin ? "Sign In" : "Create Account"
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
              {isLogin ? "New partner?" : "Already have an account?"}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          {isLogin ? "Create partner account" : "Sign in instead"}
        </Button>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </form>
    </div>
  )
}
