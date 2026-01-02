'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('role', data.data.user.role)

      if (data.data.user.role === 'ADMIN') {
        router.replace('/dashboard')
      } else {
        throw new Error('Access denied: Admins only')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-x-hidden text-black">
      {/* <div className="w-full lg:w-[634px] h-[400px] lg:h-[850px] bg-gray-100">
        <img
          src="/images/login.png"
          className="w-full h-full object-cover"
          alt="Login illustration"
        />
      </div> */}

      <div className="flex-1 flex justify-center items-center p-5">
        <div className="w-full max-w-102 flex flex-col gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome Back, Admin
            </h2>
            <p className="text-gray-500 mt-2">
              Please enter your credentials to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#4640DE] focus:ring-[#4640DE]"
                />
                Remember Me
              </label>

              <button
                type="button"
                className="text-sm text-[#4640DE] font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4640DE] text-white py-4 rounded-md font-bold text-lg hover:bg-[#3b36b8] transition-colors disabled:bg-gray-400 shadow-lg shadow-indigo-100"
            >
              {loading ? 'Logging in...' : 'Sign In to Dashboard'}
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/auth/Register')}
                  className="text-[#4640DE] font-medium hover:underline"
                >
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
