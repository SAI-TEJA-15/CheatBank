"use client"

import { Trash2, GripVertical } from "lucide-react"

/**
 * Section editor component
 * Handles editing individual sections of a cheat sheet
 */
function SectionEditor({ section, index, errors, onChange, onRemove, canRemove }) {
  const titleError = errors[`${section.id}_title`]
  const contentError = errors[`${section.id}_content`]

  return (
    <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <GripVertical className="h-4 w-4 text-dark-400" />
          <h3 className="text-lg font-medium text-white">Section {index + 1}</h3>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(section.id)}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Section Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-dark-200 mb-2">
          Section Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={section.title}
          onChange={(e) => onChange(section.id, "title", e.target.value)}
          className={`input-field w-full ${titleError ? "border-red-500" : ""}`}
          placeholder="e.g., useState Hook, Basic Commands"
        />
        {titleError && <p className="text-red-400 text-sm mt-1">{titleError}</p>}
      </div>

      {/* Section Content */}
      <div>
        <label className="block text-sm font-medium text-dark-200 mb-2">
          Content <span className="text-red-400">*</span>
        </label>
        <textarea
          value={section.content}
          onChange={(e) => onChange(section.id, "content", e.target.value)}
          rows={8}
          className={`input-field w-full resize-none font-mono text-sm ${contentError ? "border-red-500" : ""}`}
          placeholder="Enter your code examples, explanations, or reference content here..."
        />
        {contentError && <p className="text-red-400 text-sm mt-1">{contentError}</p>}
        <p className="text-dark-400 text-xs mt-1">
          Tip: Use code examples, comments, and clear formatting for better readability
        </p>
      </div>
    </div>
  )
}

export default SectionEditor
