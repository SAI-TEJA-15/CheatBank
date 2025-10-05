/**
 * Advanced search utilities for cheat sheets
 * Provides fuzzy search, ranking, and filtering capabilities
 */

/**
 * Calculate string similarity using Levenshtein distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Similarity score (0-1)
 */
const calculateSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

/**
 * Calculate Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Edit distance
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Advanced search with fuzzy matching and ranking
 * @param {Array} cheatSheets - Array of cheat sheets
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Array} Ranked search results
 */
export const advancedSearch = (cheatSheets, query, options = {}) => {
  const { fuzzyThreshold = 0.3, includeContent = true, boostExactMatches = true, boostTitleMatches = true } = options

  if (!query || query.trim() === "") {
    return cheatSheets
  }

  const searchTerm = query.toLowerCase().trim()
  const searchWords = searchTerm.split(/\s+/)

  const results = cheatSheets
    .map((sheet) => {
      let score = 0
      const matches = []

      // Title matching (highest weight)
      const titleLower = sheet.title.toLowerCase()
      if (titleLower.includes(searchTerm)) {
        score += boostTitleMatches ? 100 : 50
        matches.push({ field: "title", type: "exact" })
      } else {
        // Fuzzy title matching
        const titleSimilarity = calculateSimilarity(titleLower, searchTerm)
        if (titleSimilarity >= fuzzyThreshold) {
          score += titleSimilarity * (boostTitleMatches ? 80 : 40)
          matches.push({ field: "title", type: "fuzzy", similarity: titleSimilarity })
        }
      }

      // Description matching
      const descriptionLower = sheet.description.toLowerCase()
      if (descriptionLower.includes(searchTerm)) {
        score += 30
        matches.push({ field: "description", type: "exact" })
      }

      // Tag matching
      sheet.tags.forEach((tag) => {
        const tagLower = tag.toLowerCase()
        if (tagLower.includes(searchTerm) || searchWords.some((word) => tagLower.includes(word))) {
          score += 40
          matches.push({ field: "tags", type: "exact", value: tag })
        }
      })

      // Category matching
      const categoryLower = sheet.category.toLowerCase()
      if (categoryLower.includes(searchTerm)) {
        score += 35
        matches.push({ field: "category", type: "exact" })
      }

      // Content matching (if enabled)
      if (includeContent) {
        sheet.sections.forEach((section) => {
          const sectionTitleLower = section.title.toLowerCase()
          const sectionContentLower = section.content.toLowerCase()

          if (sectionTitleLower.includes(searchTerm)) {
            score += 25
            matches.push({ field: "section_title", type: "exact", section: section.title })
          }

          if (sectionContentLower.includes(searchTerm)) {
            score += 15
            matches.push({ field: "section_content", type: "exact", section: section.title })
          }
        })
      }

      // Word-based matching for multi-word queries
      searchWords.forEach((word) => {
        if (word.length > 2) {
          // Skip very short words
          if (titleLower.includes(word)) score += 10
          if (descriptionLower.includes(word)) score += 5
          if (sheet.tags.some((tag) => tag.toLowerCase().includes(word))) score += 8
        }
      })

      // Boost popular content
      const popularityBoost = Math.log(sheet.views + sheet.likes + sheet.downloads + 1) * 2
      score += popularityBoost

      return {
        ...sheet,
        searchScore: score,
        searchMatches: matches,
      }
    })
    .filter((sheet) => sheet.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore)

  return results
}

/**
 * Get search suggestions based on partial query
 * @param {Array} cheatSheets - Array of cheat sheets
 * @param {string} query - Partial search query
 * @param {number} limit - Maximum number of suggestions
 * @returns {Array} Search suggestions
 */
export const getSearchSuggestions = (cheatSheets, query, limit = 5) => {
  if (!query || query.length < 2) return []

  const queryLower = query.toLowerCase()
  const suggestions = new Set()

  cheatSheets.forEach((sheet) => {
    // Title suggestions
    if (sheet.title.toLowerCase().includes(queryLower)) {
      suggestions.add(sheet.title)
    }

    // Tag suggestions
    sheet.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag)
      }
    })

    // Category suggestions
    if (sheet.category.toLowerCase().includes(queryLower)) {
      suggestions.add(sheet.category)
    }
  })

  return Array.from(suggestions).slice(0, limit)
}

/**
 * Highlight search terms in text
 * @param {string} text - Text to highlight
 * @param {string} query - Search query
 * @returns {string} HTML with highlighted terms
 */
export const highlightSearchTerms = (text, query) => {
  if (!query || !text) return text

  const searchWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 1)
  let highlightedText = text

  searchWords.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi")
    highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-400 text-black px-1 rounded">$1</mark>')
  })

  return highlightedText
}

/**
 * Filter cheat sheets by multiple criteria
 * @param {Array} cheatSheets - Array of cheat sheets
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered cheat sheets
 */
export const applyFilters = (cheatSheets, filters) => {
  let filtered = [...cheatSheets]

  // Category filter
  if (filters.category && filters.category !== "") {
    filtered = filtered.filter((sheet) => sheet.category === filters.category)
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((sheet) => filters.tags.some((tag) => sheet.tags.includes(tag)))
  }

  // Author filter
  if (filters.author && filters.author !== "") {
    filtered = filtered.filter((sheet) => sheet.authorName.toLowerCase().includes(filters.author.toLowerCase()))
  }

  // Date range filter
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom)
    filtered = filtered.filter((sheet) => new Date(sheet.createdAt) >= fromDate)
  }

  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo)
    filtered = filtered.filter((sheet) => new Date(sheet.createdAt) <= toDate)
  }

  // Minimum stats filters
  if (filters.minViews && filters.minViews > 0) {
    filtered = filtered.filter((sheet) => sheet.views >= filters.minViews)
  }

  if (filters.minLikes && filters.minLikes > 0) {
    filtered = filtered.filter((sheet) => sheet.likes >= filters.minLikes)
  }

  return filtered
}

/**
 * Sort cheat sheets by various criteria
 * @param {Array} cheatSheets - Array of cheat sheets
 * @param {string} sortBy - Sort criteria
 * @param {string} order - Sort order (asc/desc)
 * @returns {Array} Sorted cheat sheets
 */
export const sortCheatSheets = (cheatSheets, sortBy, order = "desc") => {
  const sorted = [...cheatSheets]

  sorted.sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title)
        break
      case "author":
        comparison = a.authorName.localeCompare(b.authorName)
        break
      case "category":
        comparison = a.category.localeCompare(b.category)
        break
      case "created":
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
        break
      case "updated":
        comparison = new Date(a.updatedAt) - new Date(b.updatedAt)
        break
      case "views":
        comparison = a.views - b.views
        break
      case "likes":
        comparison = a.likes - b.likes
        break
      case "downloads":
        comparison = a.downloads - b.downloads
        break
      case "popular":
        comparison = a.views + a.likes + a.downloads - (b.views + b.likes + b.downloads)
        break
      case "relevance":
        comparison = (a.searchScore || 0) - (b.searchScore || 0)
        break
      default:
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
    }

    return order === "asc" ? comparison : -comparison
  })

  return sorted
}

/**
 * Get related cheat sheets based on tags and category
 * @param {Object} cheatSheet - Current cheat sheet
 * @param {Array} allCheatSheets - All available cheat sheets
 * @param {number} limit - Maximum number of related sheets
 * @returns {Array} Related cheat sheets
 */
export const getRelatedCheatSheets = (cheatSheet, allCheatSheets, limit = 4) => {
  const related = allCheatSheets
    .filter((sheet) => sheet.id !== cheatSheet.id)
    .map((sheet) => {
      let score = 0

      // Same category bonus
      if (sheet.category === cheatSheet.category) {
        score += 50
      }

      // Shared tags bonus
      const sharedTags = sheet.tags.filter((tag) => cheatSheet.tags.includes(tag))
      score += sharedTags.length * 20

      // Same author bonus
      if (sheet.authorId === cheatSheet.authorId) {
        score += 10
      }

      return { ...sheet, relationScore: score }
    })
    .filter((sheet) => sheet.relationScore > 0)
    .sort((a, b) => b.relationScore - a.relationScore)
    .slice(0, limit)

  return related
}
