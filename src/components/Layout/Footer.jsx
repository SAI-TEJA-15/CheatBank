import { Link } from "react-router-dom"
import { BookOpen, Github, Twitter, Mail } from "lucide-react"

/**
 * Footer component with links and branding
 * Responsive layout with social links and navigation
 */
function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <BookOpen className="h-8 w-8 text-primary-500" />
              <span>CheatSheet Hub</span>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed max-w-md">
              Your ultimate reference library for developers, students, and professionals. Create, browse, and share
              comprehensive cheat sheets with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-300 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-dark-300 hover:text-white text-sm transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-dark-300 hover:text-white text-sm transition-colors">
                  Create Cheat Sheet
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?category=React" className="text-dark-300 hover:text-white text-sm transition-colors">
                  React
                </Link>
              </li>
              <li>
                <Link
                  to="/search?category=JavaScript"
                  className="text-dark-300 hover:text-white text-sm transition-colors"
                >
                  JavaScript
                </Link>
              </li>
              <li>
                <Link to="/search?category=CSS" className="text-dark-300 hover:text-white text-sm transition-colors">
                  CSS
                </Link>
              </li>
              <li>
                <Link to="/search?category=Git" className="text-dark-300 hover:text-white text-sm transition-colors">
                  Git
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm">© 2025 CheatSheet Hub. Built with React and Vite.</p>

          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a href="mailto:contact@cheatsheethub.com" className="text-dark-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
