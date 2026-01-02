'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Users', href: '/dashboard/users' },
    { name: 'Companies', href: '/dashboard/companies' },
  ]

  return (
    <aside className="w-64 bg-[#202430] text-white min-h-screen p-4 pt-10 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-8 px-4">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive
                  ? 'bg-[#b2b1bc] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
