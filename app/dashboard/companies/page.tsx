'use client'

import api from '@/app/utils/axiosConfig'
import { useEffect, useState } from 'react'

interface Company {
  _id: string
  name: string
  industry: string
  location: string
  userId: {
    _id: string
    email: string
    fullName: string
    phone: string
    avatarUrl: string
    isActive: boolean
  }
  createdAt: string
}

interface Pagination {
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  })

  const fetchCompanies = async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const res = await api.get(
        `/admin/companies?page=${page}&limit=${pagination.limit}`,
        {
          headers: {
            access_token: token || '',
          },
        }
      )

      setCompanies(res.data.data)
      setPagination(res.data.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies(1)
  }, [])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchCompanies(newPage)
    }
  }

  const toggleCompanyStatus = async (company: Company) => {
    if (!company.userId?._id) {
      alert('Error: No associated user found for this company.')
      return
    }

    setActionLoading(company._id)
    try {
      const token = localStorage.getItem('accessToken')
      const res = await api.patch(
        `admin/users/${company.userId._id}/status`,
        { isActive: !company.userId.isActive },
        {
          headers: {
            access_token: token || '',
          },
        }
      )

      if (res.data.success) {
        setCompanies((prev) =>
          prev.map((c) =>
            c._id === company._id
              ? {
                  ...c,
                  userId: { ...c.userId, isActive: !c.userId.isActive },
                }
              : c
          )
        )
      }
    } catch (err: any) {
      alert(
        'Failed to update company status: ' +
          (err.response?.data?.message || err.message)
      )
    } finally {
      setActionLoading(null)
    }
  }

  if (loading && companies.length === 0)
    return (
      <div className="p-6 text-black text-center mt-10">
        Loading companies...
      </div>
    )
  if (error)
    return (
      <div className="p-6 text-red-500 text-center mt-10">Error: {error}</div>
    )

  return (
    <div className="p-6 text-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="text-sm text-gray-500">
          Showing{' '}
          {Math.min(
            (pagination.currentPage - 1) * pagination.limit + 1,
            pagination.totalCount
          )}{' '}
          to{' '}
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
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr
                key={company._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  {company.userId?.avatarUrl ? (
                    <img
                      src={company.userId.avatarUrl}
                      className="w-8 h-8 rounded-full mr-3"
                      alt=""
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-xs font-bold text-indigo-600">
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium">{company.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {company.industry || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {company.userId?.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {company.location || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.userId?.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {company.userId?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleCompanyStatus(company)}
                    disabled={actionLoading === company._id}
                    className={`px-3 py-1 rounded text-xs font-bold text-white transition-colors ${
                      company.userId?.isActive
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } disabled:opacity-50`}
                  >
                    {actionLoading === company._id
                      ? 'Updating...'
                      : company.userId?.isActive
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
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1 || loading}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={loading}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  pagination.currentPage === page
                    ? 'bg-[#4640DE] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={
            pagination.currentPage === pagination.totalPages || loading
          }
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
