"use client"

import { useEffect, useState } from "react"
import { BookOpen, Users, Download, Heart } from "lucide-react"
import { useCheatSheets } from "../../contexts/CheatSheetContext"

/**
 * Statistics section component
 * Displays key metrics about the platform
 */
function StatsSection() {
  const { cheatSheets } = useCheatSheets()
  const [stats, setStats] = useState({
    totalSheets: 0,
    totalViews: 0,
    totalDownloads: 0,
    totalLikes: 0,
  })

  useEffect(() => {
    const totalViews = cheatSheets.reduce((sum, sheet) => sum + sheet.views, 0)
    const totalDownloads = cheatSheets.reduce((sum, sheet) => sum + sheet.downloads, 0)
    const totalLikes = cheatSheets.reduce((sum, sheet) => sum + sheet.likes, 0)

    setStats({
      totalSheets: cheatSheets.length,
      totalViews,
      totalDownloads,
      totalLikes,
    })
  }, [cheatSheets])

  const statItems = [
    {
      icon: BookOpen,
      label: "Cheat Sheets",
      value: stats.totalSheets,
      color: "text-primary-400",
    },
    {
      icon: Users,
      label: "Total Views",
      value: stats.totalViews.toLocaleString(),
      color: "text-green-400",
    },
    {
      icon: Download,
      label: "Downloads",
      value: stats.totalDownloads.toLocaleString(),
      color: "text-blue-400",
    },
    {
      icon: Heart,
      label: "Likes",
      value: stats.totalLikes.toLocaleString(),
      color: "text-red-400",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-sm text-dark-300">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
