"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { sampleCheatSheets } from "../data/sampleData"

const CheatSheetContext = createContext()

/**
 * CheatSheet context provider
 * Manages cheat sheet data using localStorage for persistence
 * Provides CRUD operations for cheat sheets
 */
export function CheatSheetProvider({ children }) {
  const [cheatSheets, setCheatSheets] = useState([])
  const [loading, setLoading] = useState(true)

  // Load cheat sheets from localStorage on app start
  useEffect(() => {
    const savedCheatSheets = localStorage.getItem("cheatsheet_data")
    if (savedCheatSheets) {
      setCheatSheets(JSON.parse(savedCheatSheets))
    } else {
      // Initialize with sample data if no saved data exists
      setCheatSheets(sampleCheatSheets)
      localStorage.setItem("cheatsheet_data", JSON.stringify(sampleCheatSheets))
    }
    setLoading(false)
  }, [])

  // Save cheat sheets to localStorage whenever data changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cheatsheet_data", JSON.stringify(cheatSheets))
    }
  }, [cheatSheets, loading])

  /**
   * Create a new cheat sheet
   * @param {Object} cheatSheetData - Cheat sheet data
   * @param {string} authorId - ID of the author
   * @returns {Object} Created cheat sheet
   */
  const createCheatSheet = (cheatSheetData, authorId) => {
    const newCheatSheet = {
      id: Date.now().toString(),
      ...cheatSheetData,
      authorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      downloads: 0,
      likedBy: [],
    }

    setCheatSheets((prev) => [newCheatSheet, ...prev])
    return newCheatSheet
  }

  /**
   * Update an existing cheat sheet
   * @param {string} id - Cheat sheet ID
   * @param {Object} updates - Updates to apply
   * @returns {Object} Updated cheat sheet
   */
  const updateCheatSheet = (id, updates) => {
    const updatedCheatSheet = {
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    }

    setCheatSheets((prev) => prev.map((sheet) => (sheet.id === id ? { ...sheet, ...updatedCheatSheet } : sheet)))

    return updatedCheatSheet
  }

  /**
   * Delete a cheat sheet
   * @param {string} id - Cheat sheet ID
   */
  const deleteCheatSheet = (id) => {
    setCheatSheets((prev) => prev.filter((sheet) => sheet.id !== id))
  }

  /**
   * Get a cheat sheet by ID
   * @param {string} id - Cheat sheet ID
   * @returns {Object|null} Cheat sheet or null if not found
   */
  const getCheatSheet = (id) => {
    return cheatSheets.find((sheet) => sheet.id === id) || null
  }

  /**
   * Increment view count for a cheat sheet
   * @param {string} id - Cheat sheet ID
   */
  const incrementViews = (id) => {
    setCheatSheets((prev) => prev.map((sheet) => (sheet.id === id ? { ...sheet, views: sheet.views + 1 } : sheet)))
  }

  /**
   * Toggle like for a cheat sheet
   * @param {string} id - Cheat sheet ID
   * @param {string} userId - User ID
   */
  const toggleLike = (id, userId) => {
    setCheatSheets((prev) =>
      prev.map((sheet) => {
        if (sheet.id === id) {
          const isLiked = sheet.likedBy.includes(userId)
          return {
            ...sheet,
            likes: isLiked ? sheet.likes - 1 : sheet.likes + 1,
            likedBy: isLiked ? sheet.likedBy.filter((uid) => uid !== userId) : [...sheet.likedBy, userId],
          }
        }
        return sheet
      }),
    )
  }

  /**
   * Increment download count for a cheat sheet
   * @param {string} id - Cheat sheet ID
   */
  const incrementDownloads = (id) => {
    setCheatSheets((prev) =>
      prev.map((sheet) => (sheet.id === id ? { ...sheet, downloads: sheet.downloads + 1 } : sheet)),
    )
  }

  /**
   * Search cheat sheets
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Array} Filtered cheat sheets
   */
  const searchCheatSheets = (query, filters = {}) => {
    let filtered = [...cheatSheets]

    // Text search
    if (query) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(
        (sheet) =>
          sheet.title.toLowerCase().includes(searchTerm) ||
          sheet.description.toLowerCase().includes(searchTerm) ||
          sheet.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          sheet.category.toLowerCase().includes(searchTerm),
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((sheet) => sheet.category === filters.category)
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((sheet) => filters.tags.some((tag) => sheet.tags.includes(tag)))
    }

    // Sort by popularity, date, etc.
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "popular":
          filtered.sort((a, b) => b.likes + b.views - (a.likes + a.views))
          break
        case "recent":
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case "downloads":
          filtered.sort((a, b) => b.downloads - a.downloads)
          break
        default:
          break
      }
    }

    return filtered
  }

  /**
   * Get trending cheat sheets
   * @param {number} limit - Number of sheets to return
   * @returns {Array} Trending cheat sheets
   */
  const getTrendingCheatSheets = (limit = 6) => {
    return [...cheatSheets]
      .sort((a, b) => b.likes + b.views + b.downloads - (a.likes + a.views + a.downloads))
      .slice(0, limit)
  }

  /**
   * Get cheat sheets by category
   * @param {string} category - Category name
   * @param {number} limit - Number of sheets to return
   * @returns {Array} Cheat sheets in category
   */
  const getCheatSheetsByCategory = (category, limit = null) => {
    const filtered = cheatSheets.filter((sheet) => sheet.category === category)
    return limit ? filtered.slice(0, limit) : filtered
  }

  /**
   * Get all unique categories
   * @returns {Array} Array of category names
   */
  const getCategories = () => {
    const categories = [...new Set(cheatSheets.map((sheet) => sheet.category))]
    return categories.sort()
  }

  /**
   * Get all unique tags
   * @returns {Array} Array of tag names
   */
  const getTags = () => {
    const tags = [...new Set(cheatSheets.flatMap((sheet) => sheet.tags))]
    return tags.sort()
  }

  const value = {
    cheatSheets,
    loading,
    createCheatSheet,
    updateCheatSheet,
    deleteCheatSheet,
    getCheatSheet,
    incrementViews,
    toggleLike,
    incrementDownloads,
    searchCheatSheets,
    getTrendingCheatSheets,
    getCheatSheetsByCategory,
    getCategories,
    getTags,
  }

  return <CheatSheetContext.Provider value={value}>{children}</CheatSheetContext.Provider>
}

export function useCheatSheets() {
  const context = useContext(CheatSheetContext)
  if (!context) {
    throw new Error("useCheatSheets must be used within a CheatSheetProvider")
  }
  return context
}
