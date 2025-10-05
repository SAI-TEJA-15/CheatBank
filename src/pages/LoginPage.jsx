"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff, BookOpen } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

/**
 * Login page component
 * Handles user authentication with form validation
 */
function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to intended page after login
  const from = location.state?.from?.pathname || "/"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        navigate(from, { replace: true })
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-white mb-6">
            <BookOpen className="h-8 w-8 text-primary-500" />
            <span>CheatSheet Hub</span>
          </Link>
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-dark-300">Sign in to your account to continue creating and sharing cheat sheets</p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-dark-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Demo Account Info */}
          <div className="bg-primary-900/20 border border-primary-800/50 rounded-lg p-4">
            <h3 className="text-primary-300 font-medium text-sm mb-2">Demo Account</h3>
            <p className="text-primary-200/80 text-xs mb-2">Try the app with these demo credentials:</p>
            <div className="text-xs font-mono text-primary-200">
              <div>Email: demo@example.com</div>
              <div>Password: demo123</div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-dark-300 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
