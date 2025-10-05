"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  Copy,
  Download,
  Heart,
  Share2,
  Eye,
  Calendar,
  User,
  Edit,
  Trash2,
  ArrowLeft,
  Check,
  FileText,
} from "lucide-react"
import { useCheatSheets } from "../contexts/CheatSheetContext"
import { useAuth } from "../contexts/AuthContext"
import CodeSection from "../components/CheatSheet/CodeSection"
import ShareModal from "../components/CheatSheet/ShareModal"
import { downloadAsPDF, downloadAsText } from "../utils/downloadUtils"

/**
 * Cheat sheet viewer page component
 * Displays full cheat sheet with copy, download, and sharing functionality
 */
function CheatSheetViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCheatSheet, incrementViews, toggleLike, incrementDownloads, deleteCheatSheet } = useCheatSheets()
  const { user, isAuthenticated } = useAuth()

  const [cheatSheet, setCheatSheet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedSection, setCopiedSection] = useState(null)

  useEffect(() => {
    const sheet = getCheatSheet(id)
    if (sheet) {
      setCheatSheet(sheet)
      // Increment view count
      incrementViews(id)
    }
    setLoading(false)
  }, [id, getCheatSheet, incrementViews])

  const handleLike = () => {
    if (isAuthenticated && user && cheatSheet) {
      toggleLike(cheatSheet.id, user.id)
      // Update local state to reflect the change immediately
      setCheatSheet((prev) => {
        const isLiked = prev.likedBy.includes(user.id)
        return {
          ...prev,
          likes: isLiked ? prev.likes - 1 : prev.likes + 1,
          likedBy: isLiked ? prev.likedBy.filter((uid) => uid !== user.id) : [...prev.likedBy, user.id],
        }
      })
    }
  }

  const handleDownload = async (format) => {
    if (!cheatSheet) return

    try {
      if (format === "pdf") {
        await downloadAsPDF(cheatSheet)
      } else if (format === "text") {
        downloadAsText(cheatSheet)
      }
      incrementDownloads(cheatSheet.id)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleCopySection = async (content, sectionId) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedSection(sectionId)
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this cheat sheet?")) {
      deleteCheatSheet(cheatSheet.id)
      navigate("/")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-300">Loading cheat sheet...</p>
        </div>
      </div>
    )
  }

  if (!cheatSheet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Cheat Sheet Not Found</h1>
          <p className="text-dark-300 mb-6">The cheat sheet you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = isAuthenticated && user && cheatSheet.authorId === user.id
  const isLiked = isAuthenticated && user && cheatSheet.likedBy.includes(user.id)

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-dark-300 hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">{cheatSheet.title}</h1>
              <p className="text-dark-300 text-lg leading-relaxed mb-6">{cheatSheet.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cheatSheet.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="tag hover:bg-primary-800/40 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-dark-400">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{cheatSheet.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(cheatSheet.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{cheatSheet.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              {/* Like Button */}
              {isAuthenticated && (
                <button
                  onClick={handleLike}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isLiked
                      ? "bg-red-900/30 text-red-400 border border-red-800/50 hover:bg-red-900/50"
                      : "bg-dark-700 text-dark-300 border border-dark-600 hover:bg-dark-600 hover:text-red-400"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  <span>{cheatSheet.likes} Likes</span>
                </button>
              )}

              {/* Download Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload("pdf")}
                  className="flex-1 flex items-center justify-center space-x-2 btn-secondary text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => handleDownload("text")}
                  className="flex-1 flex items-center justify-center space-x-2 btn-secondary text-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </button>
              </div>

              {/* Share Button */}
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center justify-center space-x-2 btn-primary"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>

              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-2 pt-2 border-t border-dark-700">
                  <Link
                    to={`/edit/${cheatSheet.id}`}
                    className="flex-1 flex items-center justify-center space-x-2 btn-secondary text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-900/20 text-red-400 border border-red-800/50 hover:bg-red-900/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {cheatSheet.sections.map((section) => (
            <div key={section.id} className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
              {/* Section Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <button
                  onClick={() => handleCopySection(section.content, section.id)}
                  className="flex items-center space-x-2 text-dark-400 hover:text-white transition-colors"
                >
                  {copiedSection === section.id ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Section Content */}
              <CodeSection content={section.content} />
            </div>
          ))}
        </div>

        {/* Share Modal */}
        {showShareModal && <ShareModal cheatSheet={cheatSheet} onClose={() => setShowShareModal(false)} />}
      </div>
    </div>
  )
}

export default CheatSheetViewer
