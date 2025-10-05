"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

/**
 * Authentication context provider
 * Manages user authentication state using localStorage for persistence
 * Provides login, register, logout functionality
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("cheatsheet_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("cheatsheet_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("cheatsheet_user")
    }
  }, [user])

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Object} Success/error response
   */
  const register = async (userData) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("cheatsheet_users") || "[]")
      const userExists = existingUsers.find((u) => u.email === userData.email)

      if (userExists) {
        return { success: false, error: "User already exists with this email" }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
      }

      // Save to users list
      existingUsers.push(newUser)
      localStorage.setItem("cheatsheet_users", JSON.stringify(existingUsers))

      // Set as current user
      setUser(newUser)

      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} Success/error response
   */
  const login = async (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("cheatsheet_users") || "[]")
      const user = existingUsers.find((u) => u.email === email && u.password === password)

      if (!user) {
        return { success: false, error: "Invalid email or password" }
      }

      setUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  /**
   * Logout current user
   */
  const logout = () => {
    setUser(null)
  }

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   */
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)

    // Update in users list
    const existingUsers = JSON.parse(localStorage.getItem("cheatsheet_users") || "[]")
    const userIndex = existingUsers.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      existingUsers[userIndex] = updatedUser
      localStorage.setItem("cheatsheet_users", JSON.stringify(existingUsers))
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
