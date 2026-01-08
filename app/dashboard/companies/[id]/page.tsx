'use client'

import api from '@/app/utils/axiosConfig'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Job {
  _id: string
  title: string
  jobType: string
  status: string
  createdAt: string
  applicantsCount: number
}

interface Company {
  _id: string
  name: string
  industry: string
  location: string
  userId: {
    email: string
    avatarUrl: string
  }
}

interface Pagination {
  total: number
  totalPages: number
  page: number
  limit: number
}

export default function CompanyJobsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 3,
  })

  // Move fetchData outside useEffect to allow calling it from handlePageChange
  const fetchData = async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const headers = { Authorization: `Bearer ${token || ''}` }

      // Fetch company details (only need to do this once effectively, but ok to do here)
      const companyRes = await api.get(`/companies/${id}`, { headers })
      setCompany(companyRes.data.data)

      // Fetch company jobs
      const jobsRes = await api.get(
        `/admin/companies/${id}/jobs?page=${page}&limit=${pagination.limit}`,
        { headers }
      )

      const responseData = jobsRes.data.data
      setJobs(responseData.data || [])
      setPagination({
        total: responseData.total,
        totalPages: responseData.totalPages,
        page: responseData.page,
        limit: responseData.limit,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage)
    }
  }

  const toggleJobStatus = async (job: Job) => {
    setActionLoading(job._id)
    const newIsLive = job.status !== 'live'
    try {
      const token = localStorage.getItem('accessToken')
      const res = await api.patch(
        `/admin/jobs/${job._id}/status`,
        { isLive: newIsLive },
        {
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        }
      )

      if (res.data.success) {
        setJobs((prevJobs) =>
          prevJobs.map((j) =>
            j._id === job._id
              ? {
                  ...j,
                  status: newIsLive ? 'live' : 'closed',
                }
              : j
          )
        )
      }
    } catch (err: any) {
      alert(
        'Failed to update job status: ' +
          (err.response?.data?.message || err.message)
      )
    } finally {
      setActionLoading(null)
    }
  }

  if (loading && jobs.length === 0)
    return <div className="p-6 text-center text-black">Loading...</div>
  if (error)
    return <div className="p-6 text-center text-red-500">Error: {error}</div>

  return (
    <div className="p-6 text-black min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-100 border-b border-gray-400 text-gray-700 rounded-md hover:bg-gray-300 transition"
      >
        ← Back to Companies
      </button>

      {company && (
        <div className="mb-8 flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          {company.userId?.avatarUrl ? (
            <img
              src={company.userId.avatarUrl}
              className="w-16 h-16 rounded-full object-cover"
              alt={company.name}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600">
              {company.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-500">{company.industry}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Posted Jobs</h2>
        </div>

        {jobs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No jobs posted by this company yet.
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 w-5 text-left flex justify-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.jobType}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.applicantsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          job.status === 'live'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {job.status === 'live' ? 'Live' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 w-5 whitespace-nowrap flex justify-center">
                      <button
                        onClick={() => toggleJobStatus(job)}
                        disabled={actionLoading === job._id}
                        className={`px-3 py-1 rounded text-xs font-bold text-white transition-colors ${
                          job.status === 'live'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        } disabled:opacity-50`}
                      >
                        {actionLoading === job._id
                          ? 'Updating...'
                          : job.status === 'live'
                          ? 'Disable'
                          : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
              >
                Previous
              </button>

              <div className="text-sm text-gray-700">
                Page <span className="font-medium">{pagination.page}</span> of{' '}
                <span className="font-medium">{pagination.totalPages}</span>
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages || loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
