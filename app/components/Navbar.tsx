'use client'

import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('role')
    router.push('/auth/Login')
  }

  return (
    <nav className="h-14 bg-gray-400 border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">JobHuntly Admin</h1>

      <button
        onClick={logout}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  )
}
