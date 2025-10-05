"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TrendingUp, BookOpen, Plus } from "lucide-react"
import { useCheatSheets } from "../contexts/CheatSheetContext"
import { useAuth } from "../contexts/AuthContext"
import CheatSheetCard from "../components/CheatSheet/CheatSheetCard"
import CategoryGrid from "../components/Home/CategoryGrid"
import HeroSection from "../components/Home/HeroSection"
import StatsSection from "../components/Home/StatsSection"

/**
 * Home page component
 * Displays hero section, trending cheat sheets, categories, and statistics
 */
function HomePage() {
  const { getTrendingCheatSheets, getCategories, cheatSheets } = useCheatSheets()
  const { isAuthenticated } = useAuth()
  const [trendingSheets, setTrendingSheets] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setTrendingSheets(getTrendingCheatSheets(6))
    setCategories(getCategories())
  }, [cheatSheets])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Trending Cheat Sheets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-white">Trending Cheat Sheets</h2>
            </div>
            <Link to="/search?sortBy=popular" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
              View all trending →
            </Link>
          </div>

          {trendingSheets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingSheets.map((sheet) => (
                <CheatSheetCard key={sheet.id} cheatSheet={sheet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-dark-400 mx-auto mb-4" />
              <p className="text-dark-300">No cheat sheets available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Browse by Category</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of cheat sheets organized by technology and topic
            </p>
          </div>

          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Call to Action */}
      {isAuthenticated && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary-900/20 to-primary-800/20 border border-primary-800/50 rounded-2xl p-8">
              <Plus className="h-12 w-12 text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Share Your Knowledge?</h2>
              <p className="text-dark-300 mb-6 max-w-2xl mx-auto">
                Create comprehensive cheat sheets and help fellow developers, students, and professionals learn faster.
              </p>
              <Link to="/create" className="btn-primary text-lg px-8 py-3">
                Create Your First Cheat Sheet
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default HomePage
