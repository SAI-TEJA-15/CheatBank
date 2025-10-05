"use client"

import { X, Eye } from "lucide-react"
import CodeSection from "../CheatSheet/CodeSection"

/**
 * Preview modal component
 * Shows how the cheat sheet will look when published
 */
function PreviewModal({ cheatSheet, onClose }) {
  const formatDate = (dateString) => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 border border-dark-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-white">Preview</h3>
          </div>
          <button onClick={onClose} className="text-dark-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Cheat Sheet Header */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{cheatSheet.title}</h1>
            <p className="text-dark-300 text-lg leading-relaxed mb-6">{cheatSheet.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cheatSheet.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-dark-400">
              <div>Category: {cheatSheet.category}</div>
              <div>Created: {formatDate()}</div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {cheatSheet.sections.map((section) => (
              <div key={section.id} className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
                {/* Section Header */}
                <div className="p-6 border-b border-dark-700">
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>

                {/* Section Content */}
                <CodeSection content={section.content} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dark-700 bg-dark-800/50">
          <p className="text-dark-400 text-sm text-center">This is how your cheat sheet will appear to viewers</p>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
