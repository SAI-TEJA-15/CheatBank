"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, BookOpen, Zap, Share2 } from "lucide-react"

/**
 * Hero section component for the home page
 * Features search bar and key value propositions
 */
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Ultimate
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              {" "}
              Reference Library
            </span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Create, browse, and share comprehensive cheat sheets for developers, students, and professionals. Learn
            faster with our community-driven knowledge base.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search for React hooks, Git commands, CSS flexbox..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
            >
              Search
            </button>
          </div>
        </form>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-primary-900/20 border border-primary-800/50 rounded-xl p-6 mb-4 inline-block">
              <BookOpen className="h-8 w-8 text-primary-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Content</h3>
            <p className="text-dark-300 text-sm">
              Detailed cheat sheets with code examples, explanations, and best practices
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-900/20 border border-primary-800/50 rounded-xl p-6 mb-4 inline-block">
              <Zap className="h-8 w-8 text-primary-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Access</h3>
            <p className="text-dark-300 text-sm">Copy code snippets instantly and download as PDF for offline use</p>
          </div>

          <div className="text-center">
            <div className="bg-primary-900/20 border border-primary-800/50 rounded-xl p-6 mb-4 inline-block">
              <Share2 className="h-8 w-8 text-primary-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Community Driven</h3>
            <p className="text-dark-300 text-sm">Share your knowledge and learn from experts in the community</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
