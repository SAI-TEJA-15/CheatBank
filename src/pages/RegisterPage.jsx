"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, BookOpen } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

/**
 * Registration page component
 * Handles new user registration with form validation
 */
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return "Please fill in all fields"
    }

    if (formData.username.length < 3) {
      return "Username must be at least 3 characters long"
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long"
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match"
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address"
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        navigate("/", { replace: true })
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
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-dark-300">Join our community and start creating amazing cheat sheets</p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dark-200 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="Choose a username"
              />
            </div>

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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field w-full pr-10"
                  placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-200 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field w-full pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-dark-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
            {loading ? "Creating account..." : "Create account"}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-dark-300 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
