// src/app/(dashboard)/layout.tsx
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import ProtectedAdmin from "../components/ProtectedAdmin"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedAdmin>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-6 bg-gray-400">{children}</main>
          <Footer />
        </div>
      </div>
    </ProtectedAdmin>
  )
}
