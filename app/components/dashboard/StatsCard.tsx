import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  colorClass: string // e.g., 'bg-blue-500'
  trend?: string
  trendUp?: boolean
}

export default function StatsCard({
  title,
  value,
  icon,
  colorClass,
  trend,
  trendUp,
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p
            className={`text-xs font-medium mt-2 ${
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-md text-white ${colorClass} shadow-md`}>
        {icon}
      </div>
    </div>
  )
}
