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
      const res = await api.get(`admin/users?page=${page}&limit=${pagination.limit}`, {
        headers: {
          access_token: token || '',
        },
      })

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

  if (loading && users.length === 0) return <div className="p-6 text-black text-center">Loading users...</div>
  if (error) return <div className="p-6 text-red-500 text-center">Error: {error}</div>

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users (Job Seekers)</h1>
        <div className="text-sm text-gray-500">
          Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{' '}
          {pagination.totalCount} results
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      className="w-8 h-8 rounded-full mr-3"
                      alt=""
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-xs font-bold text-gray-500">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium text-gray-900">{user.fullName}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.phone || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1 || loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={loading}
              className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                pagination.currentPage === page
                  ? 'bg-[#4640DE] text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages || loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
