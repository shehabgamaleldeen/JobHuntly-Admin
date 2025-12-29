
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== rePassword) {
      return setError("Passwords do not match")
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:3000/auth/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          rePassword,
          role: "ADMIN",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // ✅ Save token
      localStorage.setItem("accessToken", data.data.accessToken)
      localStorage.setItem("role", data.data.user.role)

      router.replace("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Register
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm">Full Name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Confirm Password</label>
          <input
            type="password"
            required
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Creating admin..." : "Register"}
        </button>
      </form>
    </div>
  )
}
