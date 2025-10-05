"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

/**
 * Code section component with syntax highlighting and copy functionality
 * Displays code content with proper formatting
 */
function CodeSection({ content }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  // Simple syntax highlighting for common patterns
  const highlightSyntax = (code) => {
    return code
      .replace(/\/\/(.*)/g, '<span class="text-green-400">// $1</span>') // Comments
      .replace(/\/\*([\s\S]*?)\*\//g, '<span class="text-green-400">/* $1 */</span>') // Block comments
      .replace(/(const|let|var|function|class|import|export|from|default)/g, '<span class="text-blue-400">$1</span>') // Keywords
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-yellow-400">$1$2$3</span>') // Strings
      .replace(/\b(\d+)\b/g, '<span class="text-purple-400">$1</span>') // Numbers
  }

  return (
    <div className="relative">
      <div className="code-block">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(content) }} />
        </pre>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg transition-colors"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-dark-300 hover:text-white" />
        )}
      </button>
    </div>
  )
}

export default CodeSection
