
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/users">Users</Link>
        <Link href="/dashboard/companies">Companies</Link>
        <Link href="/dashboard/jobs">Jobs</Link>
        <Link href="/dashboard/applications">Applications</Link>
      </nav>
    </aside>
  )
}
