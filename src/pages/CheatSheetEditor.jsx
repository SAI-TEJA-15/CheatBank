"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Save, Plus, Eye, ArrowLeft } from "lucide-react"
import { useCheatSheets } from "../contexts/CheatSheetContext"
import { useAuth } from "../contexts/AuthContext"
import SectionEditor from "../components/Editor/SectionEditor"
import PreviewModal from "../components/Editor/PreviewModal"

/**
 * Cheat sheet editor page component
 * Handles creating and editing cheat sheets with form validation
 */
function CheatSheetEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCheatSheet, createCheatSheet, updateCheatSheet, getCategories, getTags } = useCheatSheets()
  const { user, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    sections: [
      {
        id: Date.now().toString(),
        title: "",
        content: "",
      },
    ],
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const isEditing = !!id
  const existingCategories = getCategories()
  const existingTags = getTags()

  // Load existing cheat sheet for editing
  useEffect(() => {
    if (isEditing) {
      const sheet = getCheatSheet(id)
      if (sheet) {
        // Check if user owns this cheat sheet
        if (!isAuthenticated || !user || sheet.authorId !== user.id) {
          navigate("/")
          return
        }

        setFormData({
          title: sheet.title,
          description: sheet.description,
          category: sheet.category,
          tags: sheet.tags,
          sections: sheet.sections,
        })
      } else {
        navigate("/")
      }
    }
  }, [id, isEditing, getCheatSheet, navigate, isAuthenticated, user])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleTagAdd = (e) => {
    e.preventDefault()
    const tag = tagInput.trim().toLowerCase()

    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
      setTagInput("")
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSectionChange = (sectionId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)),
    }))
  }

  const handleAddSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "",
      content: "",
    }

    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const handleRemoveSection = (sectionId) => {
    if (formData.sections.length > 1) {
      setFormData((prev) => ({
        ...prev,
        sections: prev.sections.filter((section) => section.id !== sectionId),
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required"
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required"
    }

    // Validate sections
    const sectionErrors = {}
    formData.sections.forEach((section, index) => {
      if (!section.title.trim()) {
        sectionErrors[`${section.id}_title`] = "Section title is required"
      }
      if (!section.content.trim()) {
        sectionErrors[`${section.id}_content`] = "Section content is required"
      }
    })

    return { ...newErrors, ...sectionErrors }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setLoading(false)
      return
    }

    try {
      if (isEditing) {
        updateCheatSheet(id, formData)
        navigate(`/cheatsheet/${id}`)
      } else {
        const newSheet = createCheatSheet(formData, user.id)
        navigate(`/cheatsheet/${newSheet.id}`)
      }
    } catch (error) {
      console.error("Save failed:", error)
      setErrors({ submit: "Failed to save cheat sheet. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/cheatsheet/${id}`)
    } else {
      navigate("/")
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button onClick={handleCancel} className="flex items-center space-x-2 text-dark-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? "Edit Cheat Sheet" : "Create New Cheat Sheet"}
            </h1>
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center space-x-2 btn-secondary"
            disabled={!formData.title || formData.sections.some((s) => !s.title || !s.content)}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`input-field w-full ${errors.title ? "border-red-500" : ""}`}
                  placeholder="e.g., React Hooks Reference"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className={`input-field w-full resize-none ${errors.description ? "border-red-500" : ""}`}
                  placeholder="Brief description of what this cheat sheet covers..."
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  list="categories"
                  className={`input-field w-full ${errors.category ? "border-red-500" : ""}`}
                  placeholder="e.g., React, JavaScript, CSS"
                />
                <datalist id="categories">
                  {existingCategories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Tags <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      list="tags"
                      className="input-field flex-1"
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === "Enter" && handleTagAdd(e)}
                    />
                    <button type="button" onClick={handleTagAdd} className="btn-secondary px-4">
                      Add
                    </button>
                  </div>
                  <datalist id="tags">
                    {existingTags.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>

                  {/* Tag List */}
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="tag flex items-center space-x-1">
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="text-primary-300 hover:text-primary-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                {errors.tags && <p className="text-red-400 text-sm mt-1">{errors.tags}</p>}
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Content Sections</h2>
              <button type="button" onClick={handleAddSection} className="btn-secondary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Section</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.sections.map((section, index) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  index={index}
                  errors={errors}
                  onChange={handleSectionChange}
                  onRemove={handleRemoveSection}
                  canRemove={formData.sections.length > 1}
                />
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between">
            <button type="button" onClick={handleCancel} className="btn-ghost">
              Cancel
            </button>

            <div className="flex items-center space-x-4">
              {errors.submit && <p className="text-red-400 text-sm">{errors.submit}</p>}
              <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{loading ? "Saving..." : isEditing ? "Update" : "Create"}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <PreviewModal cheatSheet={{ ...formData, id: "preview" }} onClose={() => setShowPreview(false)} />
        )}
      </div>
    </div>
  )
}

export default CheatSheetEditor
