import { Link } from "react-router-dom"
import { Home, Search } from "lucide-react"

/**
 * 404 Not Found page component
 * Displayed when user navigates to non-existent route
 */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-dark-300 text-lg leading-relaxed">
            The cheat sheet you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
          <Link to="/search" className="btn-secondary flex items-center justify-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Browse All</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-dark-700 pt-8">
          <h3 className="text-white font-semibold mb-4">Popular Categories</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/search?category=React" className="tag hover:bg-primary-800/40 transition-colors">
              React
            </Link>
            <Link to="/search?category=JavaScript" className="tag hover:bg-primary-800/40 transition-colors">
              JavaScript
            </Link>
            <Link to="/search?category=CSS" className="tag hover:bg-primary-800/40 transition-colors">
              CSS
            </Link>
            <Link to="/search?category=Git" className="tag hover:bg-primary-800/40 transition-colors">
              Git
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
