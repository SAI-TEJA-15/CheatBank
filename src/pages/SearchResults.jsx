"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Search, X } from "lucide-react"
import { useCheatSheets } from "../contexts/CheatSheetContext"
import CheatSheetCard from "../components/CheatSheet/CheatSheetCard"
import SearchSuggestions from "../components/Search/SearchSuggestions"
import AdvancedFilters from "../components/Search/AdvancedFilters"
import { advancedSearch, applyFilters, sortCheatSheets } from "../utils/searchUtils"

/**
 * Enhanced search results page component
 * Displays filtered and sorted cheat sheets with advanced search capabilities
 */
function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { cheatSheets, getCategories, getTags } = useCheatSheets()

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "relevance")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Advanced filters state
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    tags: [],
    author: "",
    dateFrom: "",
    dateTo: "",
    minViews: 0,
    minLikes: 0,
  })

  const categories = getCategories()
  const tags = getTags()

  // Update results when search parameters change
  useEffect(() => {
    setLoading(true)

    let searchResults = []

    if (query.trim()) {
      // Use advanced search for queries
      searchResults = advancedSearch(cheatSheets, query, {
        includeContent: true,
        boostExactMatches: true,
        boostTitleMatches: true,
      })
    } else {
      // Show all sheets if no query
      searchResults = [...cheatSheets]
    }

    // Apply filters
    searchResults = applyFilters(searchResults, filters)

    // Sort results
    searchResults = sortCheatSheets(searchResults, sortBy)

    setResults(searchResults)
    setLoading(false)
  }, [query, filters, sortBy, cheatSheets])

  // Update URL parameters
  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (filters.category) params.set("category", filters.category)
    if (sortBy !== "relevance") params.set("sortBy", sortBy)

    setSearchParams(params)
  }, [query, filters.category, sortBy, setSearchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
  }

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion)
    setShowSuggestions(false)
  }

  const clearFilters = () => {
    setQuery("")
    setFilters({
      category: "",
      tags: [],
      author: "",
      dateFrom: "",
      dateTo: "",
      minViews: 0,
      minLikes: 0,
    })
    setSortBy("relevance")
  }

  const hasActiveFilters =
    query ||
    filters.category ||
    filters.tags.length > 0 ||
    filters.author ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.minViews > 0 ||
    filters.minLikes > 0 ||
    sortBy !== "relevance"

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            {query
              ? `Search results for "${query}"`
              : filters.category
                ? `${filters.category} Cheat Sheets`
                : "All Cheat Sheets"}
          </h1>
          <p className="text-dark-300">
            {loading ? "Searching..." : `${results.length} ${results.length === 1 ? "result" : "results"} found`}
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 mb-6">
          <form onSubmit={handleSearch} className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search cheat sheets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              {/* Search Suggestions */}
              {showSuggestions && (
                <SearchSuggestions
                  query={query}
                  cheatSheets={cheatSheets}
                  onSelect={handleSuggestionSelect}
                  onClose={() => setShowSuggestions(false)}
                />
              )}
            </div>
          </form>

          {/* Sort and Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-dark-200">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="created">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                  <option value="downloads">Most Downloaded</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>

              {/* Quick Category Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-dark-200">Category:</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                  className="bg-dark-700 border border-dark-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mb-6">
          <AdvancedFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            tags={tags}
            onClear={clearFilters}
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((sheet) => (
              <CheatSheetCard key={sheet.id} cheatSheet={sheet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-dark-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-dark-300 mb-6">
              {query
                ? `No cheat sheets match your search for "${query}"`
                : "No cheat sheets found with the current filters"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
              <Link to="/" className="btn-primary">
                Browse All Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
