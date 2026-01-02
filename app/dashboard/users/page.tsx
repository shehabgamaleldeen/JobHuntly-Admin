'use client'

import api from '@/app/utils/axiosConfig'
import { useEffect, useState } from 'react'

interface User {
  _id: string
  fullName: string
  email: string
  phone: string
  avatarUrl: string
  isActive: boolean
  createdAt: string
}

interface Pagination {
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  })

  const fetchUsers = async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const res = await api.get(
        `admin/users?page=${page}&limit=${pagination.limit}`,
        {
          headers: {
            access_token: token || '',
          },
        }
      )

      setUsers(res.data.data)
      setPagination(res.data.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage)
    }
  }

  const toggleUserStatus = async (user: User) => {
    setActionLoading(user._id)
    try {
      const token = localStorage.getItem('accessToken')
      const res = await api.patch(
        `admin/users/${user._id}/status`,
        { isActive: !user.isActive },
        {
          headers: {
            access_token: token || '',
          },
        }
      )

      if (res.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, isActive: !u.isActive } : u
          )
        )
      }
    } catch (err: any) {
      alert(
        'Failed to update user status: ' +
          (err.response?.data?.message || err.message)
      )
    } finally {
      setActionLoading(null)
    }
  }

  if (loading && users.length === 0)
    return (
      <div className="p-6 text-black text-center mt-10">Loading users...</div>
    )
  if (error)
    return (
      <div className="p-6 text-red-500 text-center mt-10">Error: {error}</div>
    )

  return (
    <div className="p-6 text-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users (Job Seekers)</h1>
        <div className="text-sm text-gray-500">
          Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
          {Math.min(
            pagination.currentPage * pagination.limit,
            pagination.totalCount
          )}{' '}
          of {pagination.totalCount} results
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-50">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      className="w-8 h-8 rounded-full mr-3"
                      alt=""
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-xs font-bold text-gray-500">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium">{user.fullName}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.phone || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleUserStatus(user)}
                    disabled={actionLoading === user._id}
                    className={`px-3 py-1 rounded text-xs font-bold text-white transition-colors ${
                      user.isActive
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } disabled:opacity-50`}
                  >
                    {actionLoading === user._id
                      ? 'Updating...'
                      : user.isActive
                      ? 'Block'
                      : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1 || loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
        >
          Previous
        </button>

        <div className="text-sm text-gray-700">
          Page <span className="font-medium">{pagination.currentPage}</span> of{' '}
          <span className="font-medium">{pagination.totalPages}</span>
        </div>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages || loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
