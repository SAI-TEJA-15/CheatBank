/**
 * Sharing utilities for cheat sheets
 * Provides various sharing methods and URL generation
 */

/**
 * Generate shareable URL for a cheat sheet
 * @param {string} cheatSheetId - ID of the cheat sheet
 * @returns {string} Full URL to the cheat sheet
 */
export const generateShareUrl = (cheatSheetId) => {
  return `${window.location.origin}/cheatsheet/${cheatSheetId}`
}

/**
 * Generate share text for social media
 * @param {Object} cheatSheet - Cheat sheet data
 * @returns {string} Formatted share text
 */
export const generateShareText = (cheatSheet) => {
  return `Check out this ${cheatSheet.title} cheat sheet on CheatSheet Hub! Perfect for ${cheatSheet.category} developers. #CheatSheet #${cheatSheet.category} #Programming`
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const result = document.execCommand("copy")
      document.body.removeChild(textArea)
      return result
    } catch (fallbackError) {
      console.error("Failed to copy to clipboard:", fallbackError)
      return false
    }
  }
}

/**
 * Share via Web Share API (mobile devices)
 * @param {Object} cheatSheet - Cheat sheet data
 * @returns {Promise<boolean>} Success status
 */
export const shareViaWebAPI = async (cheatSheet) => {
  if (!navigator.share) {
    return false
  }

  try {
    await navigator.share({
      title: cheatSheet.title,
      text: generateShareText(cheatSheet),
      url: generateShareUrl(cheatSheet.id),
    })
    return true
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Web Share API failed:", error)
    }
    return false
  }
}

/**
 * Open social media share window
 * @param {string} platform - Social media platform
 * @param {Object} cheatSheet - Cheat sheet data
 */
export const shareOnSocialMedia = (platform, cheatSheet) => {
  const url = generateShareUrl(cheatSheet.id)
  const text = generateShareText(cheatSheet)
  let shareUrl = ""

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      break
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(
        text,
      )}`
      break
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url,
      )}&summary=${encodeURIComponent(text)}`
      break
    case "reddit":
      shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        cheatSheet.title,
      )}`
      break
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
      break
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
      break
    default:
      console.error("Unsupported platform:", platform)
      return
  }

  window.open(shareUrl, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes")
}

/**
 * Generate embed code for cheat sheet
 * @param {string} cheatSheetId - ID of the cheat sheet
 * @param {Object} options - Embed options
 * @returns {string} HTML embed code
 */
export const generateEmbedCode = (cheatSheetId, options = {}) => {
  const { width = "100%", height = "400px", theme = "dark" } = options
  const embedUrl = `${window.location.origin}/embed/${cheatSheetId}?theme=${theme}`

  return `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"></iframe>`
}

/**
 * Share via email
 * @param {Object} cheatSheet - Cheat sheet data
 */
export const shareViaEmail = (cheatSheet) => {
  const subject = encodeURIComponent(`Check out this ${cheatSheet.title} cheat sheet`)
  const body = encodeURIComponent(`
Hi!

I found this useful cheat sheet and thought you might be interested:

${cheatSheet.title}
${cheatSheet.description}

Check it out here: ${generateShareUrl(cheatSheet.id)}

Best regards!
  `)

  window.location.href = `mailto:?subject=${subject}&body=${body}`
}

/**
 * Download share data as JSON
 * @param {Object} cheatSheet - Cheat sheet data
 */
export const downloadShareData = (cheatSheet) => {
  const shareData = {
    title: cheatSheet.title,
    description: cheatSheet.description,
    url: generateShareUrl(cheatSheet.id),
    category: cheatSheet.category,
    tags: cheatSheet.tags,
    author: cheatSheet.authorName,
    createdAt: cheatSheet.createdAt,
  }

  const blob = new Blob([JSON.stringify(shareData, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${cheatSheet.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_share_data.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
