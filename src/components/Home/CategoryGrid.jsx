"use client"

import { Link } from "react-router-dom"
import { useCheatSheets } from "../../contexts/CheatSheetContext"

/**
 * Category grid component
 * Displays categories with cheat sheet counts
 */
function CategoryGrid({ categories }) {
  const { getCheatSheetsByCategory } = useCheatSheets()

  // Category icons mapping
  const categoryIcons = {
    React: "⚛️",
    JavaScript: "🟨",
    CSS: "🎨",
    Git: "📝",
    Python: "🐍",
    DevOps: "🚀",
    HTML: "🌐",
    Node: "💚",
    TypeScript: "🔷",
    Vue: "💚",
    Angular: "🔴",
    Docker: "🐳",
    AWS: "☁️",
    Database: "🗄️",
  }

  const getCategoryIcon = (category) => {
    return categoryIcons[category] || "📚"
  }

  const getCategoryColor = (index) => {
    const colors = [
      "from-blue-900/20 to-blue-800/20 border-blue-800/50",
      "from-green-900/20 to-green-800/20 border-green-800/50",
      "from-purple-900/20 to-purple-800/20 border-purple-800/50",
      "from-orange-900/20 to-orange-800/20 border-orange-800/50",
      "from-red-900/20 to-red-800/20 border-red-800/50",
      "from-teal-900/20 to-teal-800/20 border-teal-800/50",
    ]
    return colors[index % colors.length]
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-300">No categories available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => {
        const count = getCheatSheetsByCategory(category).length
        return (
          <Link
            key={category}
            to={`/search?category=${encodeURIComponent(category)}`}
            className={`bg-gradient-to-br ${getCategoryColor(
              index,
            )} border rounded-xl p-6 hover:scale-105 transition-all duration-200 group`}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">{getCategoryIcon(category)}</div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors">
                {category}
              </h3>
              <p className="text-sm text-dark-300">
                {count} {count === 1 ? "sheet" : "sheets"}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CategoryGrid
