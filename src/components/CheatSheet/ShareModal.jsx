"use client"

import { useState } from "react"
import { X, Copy, Check, Twitter, Facebook, Linkedin, Mail, MessageCircle, Send, Download } from "lucide-react"
import {
  copyToClipboard,
  shareViaWebAPI,
  shareOnSocialMedia,
  shareViaEmail,
  generateEmbedCode,
  downloadShareData,
} from "../../utils/shareUtils"

/**
 * Enhanced share modal component
 * Provides comprehensive sharing options for cheat sheets
 */
function ShareModal({ cheatSheet, onClose }) {
  const [copied, setCopied] = useState("")
  const [embedOptions, setEmbedOptions] = useState({
    width: "100%",
    height: "400px",
    theme: "dark",
  })

  const shareUrl = `${window.location.origin}/cheatsheet/${cheatSheet.id}`

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl)
    if (success) {
      setCopied("link")
      setTimeout(() => setCopied(""), 2000)
    }
  }

  const handleCopyEmbed = async () => {
    const embedCode = generateEmbedCode(cheatSheet.id, embedOptions)
    const success = await copyToClipboard(embedCode)
    if (success) {
      setCopied("embed")
      setTimeout(() => setCopied(""), 2000)
    }
  }

  const handleWebShare = async () => {
    const success = await shareViaWebAPI(cheatSheet)
    if (!success) {
      // Fallback to copy link if Web Share API is not available
      handleCopyLink()
    }
  }

  const socialPlatforms = [
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-blue-400" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-500" },
    { id: "reddit", name: "Reddit", icon: MessageCircle, color: "text-orange-500" },
    { id: "telegram", name: "Telegram", icon: Send, color: "text-blue-400" },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "text-green-500" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">Share Cheat Sheet</h3>
          <button onClick={onClose} className="text-dark-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cheat Sheet Info */}
          <div className="bg-dark-700 rounded-lg p-4">
            <h4 className="font-medium text-white mb-1">{cheatSheet.title}</h4>
            <p className="text-dark-300 text-sm line-clamp-2">{cheatSheet.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {cheatSheet.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Share */}
          <div>
            <h4 className="text-sm font-medium text-dark-200 mb-3">Quick Share</h4>
            <div className="flex gap-3">
              {/* Native Share (Mobile) */}
              {navigator.share && (
                <button
                  onClick={handleWebShare}
                  className="flex-1 flex items-center justify-center space-x-2 btn-primary py-3"
                >
                  <Send className="h-4 w-4" />
                  <span>Share</span>
                </button>
              )}

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center space-x-2 btn-secondary py-3"
              >
                {copied === "link" ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              {/* Email */}
              <button
                onClick={() => shareViaEmail(cheatSheet)}
                className="flex items-center justify-center space-x-2 btn-secondary px-4 py-3"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </button>
            </div>
          </div>

          {/* Share URL */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">Share URL</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-medium text-dark-200 mb-3">Social Media</h4>
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => shareOnSocialMedia(platform.id, cheatSheet)}
                  className="flex flex-col items-center space-y-2 p-4 bg-dark-700 border border-dark-600 rounded-lg hover:bg-dark-600 transition-colors"
                >
                  <platform.icon className={`h-6 w-6 ${platform.color}`} />
                  <span className="text-sm text-dark-300">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <h4 className="text-sm font-medium text-dark-200 mb-3">Embed in Website</h4>
            <div className="space-y-3">
              {/* Embed Options */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-dark-300 mb-1">Width</label>
                  <input
                    type="text"
                    value={embedOptions.width}
                    onChange={(e) => setEmbedOptions((prev) => ({ ...prev, width: e.target.value }))}
                    className="w-full bg-dark-700 border border-dark-600 text-white px-2 py-1 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-dark-300 mb-1">Height</label>
                  <input
                    type="text"
                    value={embedOptions.height}
                    onChange={(e) => setEmbedOptions((prev) => ({ ...prev, height: e.target.value }))}
                    className="w-full bg-dark-700 border border-dark-600 text-white px-2 py-1 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-dark-300 mb-1">Theme</label>
                  <select
                    value={embedOptions.theme}
                    onChange={(e) => setEmbedOptions((prev) => ({ ...prev, theme: e.target.value }))}
                    className="w-full bg-dark-700 border border-dark-600 text-white px-2 py-1 rounded text-sm"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
              </div>

              {/* Embed Code */}
              <div className="relative">
                <textarea
                  value={generateEmbedCode(cheatSheet.id, embedOptions)}
                  readOnly
                  rows={3}
                  className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg text-sm font-mono resize-none"
                />
                <button
                  onClick={handleCopyEmbed}
                  className="absolute top-2 right-2 p-1 bg-dark-600 hover:bg-dark-500 rounded transition-colors"
                >
                  {copied === "embed" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-dark-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <h4 className="text-sm font-medium text-dark-200 mb-3">Advanced</h4>
            <div className="flex gap-3">
              <button
                onClick={() => downloadShareData(cheatSheet)}
                className="flex items-center space-x-2 btn-secondary text-sm px-4 py-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Metadata</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
