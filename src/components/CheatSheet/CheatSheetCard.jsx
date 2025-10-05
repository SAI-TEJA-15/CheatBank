"use client"

import { Link } from "react-router-dom"
import { Eye, Heart, Download, Calendar, User } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useCheatSheets } from "../../contexts/CheatSheetContext"
import ShareButton from "../UI/ShareButton"

/**
 * Cheat sheet card component
 * Displays cheat sheet preview with stats and actions
 */
function CheatSheetCard({ cheatSheet }) {
  const { user, isAuthenticated } = useAuth()
  const { toggleLike } = useCheatSheets()

  const handleLike = (e) => {
    e.preventDefault()
    if (isAuthenticated && user) {
      toggleLike(cheatSheet.id, user.id)
    }
  }

  const isLiked = isAuthenticated && user && cheatSheet.likedBy.includes(user.id)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Link to={`/cheatsheet/${cheatSheet.id}`} className="block group">
      <div className="card card-hover h-full relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
              {cheatSheet.title}
            </h3>
            <p className="text-dark-300 text-sm line-clamp-2 leading-relaxed">{cheatSheet.description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cheatSheet.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-xs">
              {tag}
            </span>
          ))}
          {cheatSheet.tags.length > 3 && (
            <span className="tag-secondary text-xs">+{cheatSheet.tags.length - 3} more</span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-dark-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{cheatSheet.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className={`h-4 w-4 ${isLiked ? "text-red-400 fill-current" : ""}`} />
              <span>{cheatSheet.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{cheatSheet.downloads}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-700">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-dark-400" />
            <span className="text-sm text-dark-300">{cheatSheet.authorName}</span>
          </div>
          <div className="flex items-center space-x-1 text-dark-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{formatDate(cheatSheet.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <ShareButton cheatSheet={cheatSheet} variant="ghost" size="sm" />

          {/* Like Button */}
          {isAuthenticated && (
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked
                  ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                  : "bg-dark-700 text-dark-400 hover:bg-dark-600 hover:text-red-400"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CheatSheetCard
