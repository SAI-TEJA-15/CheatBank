"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { shareViaWebAPI, copyToClipboard } from "../../utils/shareUtils"

/**
 * Compact share button component
 * Can be used throughout the app for quick sharing
 */
function ShareButton({ cheatSheet, variant = "default", size = "md" }) {
  const [isSharing, setIsSharing] = useState(false)

  const handleQuickShare = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSharing(true)

    try {
      // Try native share first (mobile)
      const webShareSuccess = await shareViaWebAPI(cheatSheet)

      if (!webShareSuccess) {
        // Fallback to copying link
        const shareUrl = `${window.location.origin}/cheatsheet/${cheatSheet.id}`
        await copyToClipboard(shareUrl)
      }
    } catch (error) {
      console.error("Share failed:", error)
    } finally {
      setIsSharing(false)
    }
  }

  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const baseClasses = `${sizeClasses[size]} rounded-full transition-all duration-200 ${
    isSharing ? "animate-pulse" : ""
  }`

  if (variant === "ghost") {
    return (
      <button
        onClick={handleQuickShare}
        disabled={isSharing}
        className={`${baseClasses} text-dark-400 hover:text-white hover:bg-dark-700`}
        title="Share cheat sheet"
      >
        <Share2 className={iconSizes[size]} />
      </button>
    )
  }

  return (
    <button
      onClick={handleQuickShare}
      disabled={isSharing}
      className={`${baseClasses} bg-primary-600 hover:bg-primary-700 text-white`}
      title="Share cheat sheet"
    >
      <Share2 className={iconSizes[size]} />
    </button>
  )
}

export default ShareButton
