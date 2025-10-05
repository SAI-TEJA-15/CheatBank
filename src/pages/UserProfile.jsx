"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Edit, Plus, BookOpen, Heart, Download, Calendar } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useCheatSheets } from "../contexts/CheatSheetContext"
import CheatSheetCard from "../components/CheatSheet/CheatSheetCard"

/**
 * User profile page component
 * Displays user information and their created cheat sheets
 */
function UserProfile() {
  const { user, isAuthenticated, updateProfile } = useAuth()
  const { cheatSheets } = useCheatSheets()
  const navigate = useNavigate()

  const [userSheets, setUserSheets] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
      })

      // Filter cheat sheets created by this user
      const userCreatedSheets = cheatSheets.filter((sheet) => sheet.authorId === user.id)
      setUserSheets(userCreatedSheets)
    }
  }, [user, isAuthenticated, navigate, cheatSheets])

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    updateProfile(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const getTotalStats = () => {
    return userSheets.reduce(
      (stats, sheet) => ({
        views: stats.views + sheet.views,
        likes: stats.likes + sheet.likes,
        downloads: stats.downloads + sheet.downloads,
      }),
      { views: 0, likes: 0, downloads: 0 },
    )
  }

  if (!isAuthenticated || !user) {
    return null // Will redirect to login
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="w-20 h-20 rounded-full" />

              {/* User Info */}
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-200 mb-1">Username</label>
                      <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-200 mb-1">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-white mb-2">{user.username}</h1>
                    <p className="text-dark-300 mb-4">{user.email}</p>
                    <div className="flex items-center space-x-2 text-sm text-dark-400">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            {!isEditing && (
              <div className="flex flex-col gap-3 min-w-[200px]">
                <button onClick={() => setIsEditing(true)} className="btn-secondary flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
                <Link to="/create" className="btn-primary flex items-center justify-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Cheat Sheet</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userSheets.length}</div>
            <div className="text-sm text-dark-300">Cheat Sheets</div>
          </div>
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
            <User className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.views.toLocaleString()}</div>
            <div className="text-sm text-dark-300">Total Views</div>
          </div>
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.likes}</div>
            <div className="text-sm text-dark-300">Total Likes</div>
          </div>
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
            <Download className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.downloads}</div>
            <div className="text-sm text-dark-300">Downloads</div>
          </div>
        </div>

        {/* User's Cheat Sheets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My Cheat Sheets</h2>
            <Link to="/create" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
              Create new →
            </Link>
          </div>

          {userSheets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSheets.map((sheet) => (
                <CheatSheetCard key={sheet.id} cheatSheet={sheet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-dark-800 border border-dark-700 rounded-xl">
              <BookOpen className="h-16 w-16 text-dark-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No cheat sheets yet</h3>
              <p className="text-dark-300 mb-6">Start sharing your knowledge by creating your first cheat sheet</p>
              <Link to="/create" className="btn-primary">
                Create Your First Cheat Sheet
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
