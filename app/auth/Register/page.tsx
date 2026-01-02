'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== rePassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          rePassword,
          role: 'ADMIN',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMsg = data.error || data.message || 'Registration failed'
        
        if (errorMsg === 'Admin already exists') {
          throw new Error(
            'Registration failed: An admin account already exists. Only one admin is allowed.'
          )
        }
        throw new Error(errorMsg)
      }

      // ✅ Save token
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('role', data.data.user.role)

      router.replace('/dashboard')
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
              Create Admin Account
            </h2>
            <p className="text-gray-500 mt-2">
              Please enter your details to create a new admin account.
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
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent text-black"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4640DE] focus:border-transparent text-black"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4640DE] text-white py-4 rounded-md font-bold text-lg hover:bg-[#3b36b8] transition-colors disabled:bg-gray-400 shadow-lg shadow-indigo-100"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/auth/Login')}
                  className="text-[#4640DE] font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
