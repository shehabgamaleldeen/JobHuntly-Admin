'use client'

import api from '@/app/utils/axiosConfig'
import React, { useEffect, useState } from 'react'
import { FiUsers, FiBriefcase, FiCheckSquare, FiFileText } from 'react-icons/fi'
import StatsCard from '../components/dashboard/StatsCard'
import ChartSection from '../components/dashboard/ChartSection'
import RecentActivity from '../components/dashboard/RecentActivity'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    liveJobs: 0,
    totalApplications: 0,
    jobDistribution: [],
  })
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const headers = { Authorization: `Bearer ${token || ''}` }

        const statsRes = await api.get('/admin/dashboard-stats', { headers })
        if (statsRes.data.success) {
          setStats(statsRes.data.data)
        }

        const activityRes = await api.get('/admin/recent-activity', { headers })
        if (activityRes.data.success) {
          setActivities(activityRes.data.data)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FiUsers size={24} />}
          colorClass="bg-amber-400"
        />
        <StatsCard
          title="Live Jobs"
          value={stats.liveJobs}
          icon={<FiBriefcase size={24} />}
          colorClass="bg-blue-500"
        />
        <StatsCard
          title="Companies"
          value={stats.totalCompanies}
          icon={<FiBriefcase size={24} />}
          colorClass="bg-purple-500"
        />
        <StatsCard
          title="Applications"
          value={stats.totalApplications}
          icon={<FiFileText size={24} />}
          colorClass="bg-green-500"
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartSection data={stats.jobDistribution || []} />
        </div>
        <div>
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  )
}
