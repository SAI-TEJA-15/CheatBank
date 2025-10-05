"use client"

import { useState, useEffect } from "react"
import { Search, Clock } from "lucide-react"
import { getSearchSuggestions } from "../../utils/searchUtils"

/**
 * Search suggestions component
 * Shows autocomplete suggestions as user types
 */
function SearchSuggestions({ query, cheatSheets, onSelect, onClose }) {
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("cheatsheet_recent_searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (query && query.length >= 2) {
      const newSuggestions = getSearchSuggestions(cheatSheets, query, 8)
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query, cheatSheets])

  const handleSelect = (suggestion) => {
    // Save to recent searches
    const updated = [suggestion, ...recentSearches.filter((s) => s !== suggestion)].slice(0, 10)
    setRecentSearches(updated)
    localStorage.setItem("cheatsheet_recent_searches", JSON.stringify(updated))

    onSelect(suggestion)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("cheatsheet_recent_searches")
  }

  if (!query && recentSearches.length === 0 && suggestions.length === 0) {
    return null
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-dark-800 border border-dark-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
      {/* Recent Searches */}
      {!query && recentSearches.length > 0 && (
        <div className="p-3 border-b border-dark-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-dark-200">Recent Searches</h4>
            <button onClick={clearRecentSearches} className="text-xs text-dark-400 hover:text-dark-200">
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.slice(0, 5).map((search, index) => (
              <button
                key={index}
                onClick={() => handleSelect(search)}
                className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm text-dark-300 hover:text-white hover:bg-dark-700 rounded"
              >
                <Clock className="h-3 w-3" />
                <span>{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-3">
          <h4 className="text-sm font-medium text-dark-200 mb-2">Suggestions</h4>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm text-dark-300 hover:text-white hover:bg-dark-700 rounded"
              >
                <Search className="h-3 w-3" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No suggestions */}
      {query && suggestions.length === 0 && (
        <div className="p-3 text-center text-sm text-dark-400">No suggestions found</div>
      )}
    </div>
  )
}

export default SearchSuggestions
