"use client"

import { useState } from "react"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

/**
 * Advanced filters component
 * Provides detailed filtering options for search results
 */
function AdvancedFilters({ filters, onFiltersChange, categories, tags, onClear }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || []
    const newTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag]

    handleFilterChange("tags", newTags)
  }

  const hasActiveFilters = Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value && value !== ""
  })

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-dark-700 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-primary-400" />
          <span className="font-medium text-white">Advanced Filters</span>
          {hasActiveFilters && <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">Active</span>}
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4 border-t border-dark-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Category</label>
              <select
                value={filters.category || ""}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Author</label>
              <input
                type="text"
                value={filters.author || ""}
                onChange={(e) => handleFilterChange("author", e.target.value)}
                placeholder="Filter by author..."
                className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Minimum Views */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Minimum Views</label>
              <input
                type="number"
                value={filters.minViews || ""}
                onChange={(e) => handleFilterChange("minViews", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Created After</label>
              <input
                type="date"
                value={filters.dateFrom || ""}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Created Before</label>
              <input
                type="date"
                value={filters.dateTo || ""}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Minimum Likes */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Minimum Likes</label>
              <input
                type="number"
                value={filters.minLikes || ""}
                onChange={(e) => handleFilterChange("minLikes", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                className="w-full bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {tags.slice(0, 20).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    (filters.tags || []).includes(tag)
                      ? "bg-primary-600 text-white"
                      : "bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end pt-2 border-t border-dark-700">
              <button
                onClick={onClear}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdvancedFilters
