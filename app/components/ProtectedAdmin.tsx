
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedAdmin({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken")
//     const role = localStorage.getItem("role")

//     if (!token || role !== "ADMIN") {
//       router.replace("/login")
//     }
//   }, [router])

  return <>{children}</>
}
