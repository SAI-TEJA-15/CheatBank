import jsPDF from "jspdf"

/**
 * Download utilities for cheat sheets
 * Provides PDF and text download functionality
 */

/**
 * Download cheat sheet as PDF
 * @param {Object} cheatSheet - Cheat sheet data
 */
export const downloadAsPDF = async (cheatSheet) => {
  try {
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const maxWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Helper function to add text with word wrapping
    const addText = (text, fontSize = 12, isBold = false) => {
      pdf.setFontSize(fontSize)
      if (isBold) {
        pdf.setFont(undefined, "bold")
      } else {
        pdf.setFont(undefined, "normal")
      }

      const lines = pdf.splitTextToSize(text, maxWidth)
      const lineHeight = fontSize * 0.4

      // Check if we need a new page
      if (yPosition + lines.length * lineHeight > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.text(lines, margin, yPosition)
      yPosition += lines.length * lineHeight + 5
    }

    // Add title
    addText(cheatSheet.title, 20, true)
    yPosition += 5

    // Add description
    addText(cheatSheet.description, 12)
    yPosition += 5

    // Add metadata
    addText(`Author: ${cheatSheet.authorName}`, 10)
    addText(`Created: ${new Date(cheatSheet.createdAt).toLocaleDateString()}`, 10)
    addText(`Tags: ${cheatSheet.tags.join(", ")}`, 10)
    yPosition += 10

    // Add sections
    cheatSheet.sections.forEach((section) => {
      // Section title
      addText(section.title, 16, true)
      yPosition += 5

      // Section content
      addText(section.content, 10)
      yPosition += 10
    })

    // Save the PDF
    pdf.save(`${cheatSheet.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`)
  } catch (error) {
    console.error("PDF generation failed:", error)
    throw new Error("Failed to generate PDF")
  }
}

/**
 * Download cheat sheet as plain text
 * @param {Object} cheatSheet - Cheat sheet data
 */
export const downloadAsText = (cheatSheet) => {
  try {
    let content = ""

    // Add header
    content += `${cheatSheet.title}\n`
    content += "=".repeat(cheatSheet.title.length) + "\n\n"

    // Add description
    content += `${cheatSheet.description}\n\n`

    // Add metadata
    content += `Author: ${cheatSheet.authorName}\n`
    content += `Created: ${new Date(cheatSheet.createdAt).toLocaleDateString()}\n`
    content += `Tags: ${cheatSheet.tags.join(", ")}\n\n`

    // Add sections
    cheatSheet.sections.forEach((section, index) => {
      content += `${index + 1}. ${section.title}\n`
      content += "-".repeat(section.title.length + 3) + "\n\n"
      content += `${section.content}\n\n`
    })

    // Add footer
    content += "\n---\n"
    content += "Generated from CheatSheet Hub\n"
    content += `${window.location.origin}/cheatsheet/${cheatSheet.id}\n`

    // Create and download file
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${cheatSheet.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Text download failed:", error)
    throw new Error("Failed to download as text")
  }
}
