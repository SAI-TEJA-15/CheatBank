"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Search, Menu, X, User, LogOut, Plus, BookOpen } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

/**
 * Header component with navigation, search, and user menu
 * Responsive design with mobile hamburger menu
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-white hover:text-primary-400 transition-colors"
          >
            <BookOpen className="h-8 w-8 text-primary-500" />
            <span>CheatSheet Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary-400" : "text-dark-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/create"
                className={`text-sm font-medium transition-colors ${
                  isActive("/create") ? "text-primary-400" : "text-dark-300 hover:text-white"
                }`}
              >
                Create
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-400" />
              <input
                type="text"
                placeholder="Search cheat sheets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/create" className="btn-primary flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="h-8 w-8 rounded-full" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-dark-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-700">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search cheat sheets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive("/") ? "text-primary-400 bg-dark-700" : "text-dark-300 hover:text-white hover:bg-dark-700"
                }`}
              >
                Home
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/create"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/create")
                        ? "text-primary-400 bg-dark-700"
                        : "text-dark-300 hover:text-white hover:bg-dark-700"
                    }`}
                  >
                    Create Cheat Sheet
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/profile")
                        ? "text-primary-400 bg-dark-700"
                        : "text-dark-300 hover:text-white hover:bg-dark-700"
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/login")
                        ? "text-primary-400 bg-dark-700"
                        : "text-dark-300 hover:text-white hover:bg-dark-700"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive("/register")
                        ? "text-primary-400 bg-dark-700"
                        : "text-dark-300 hover:text-white hover:bg-dark-700"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
