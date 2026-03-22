"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode
  requireAdmin?: boolean
}) {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!auth.isLoggedIn || !auth.token) {
      router.push("/login")
      return
    }

    if (requireAdmin && auth.user?.role !== "admin") {
      router.push("/booking")
    }
  }, [auth, requireAdmin, router])

  if (!auth.isLoggedIn || !auth.token) {
    return <div>Loading...</div>
  }

  if (requireAdmin && auth.user?.role !== "admin") {
    return <div>Loading...</div>
  }

  return <>{children}</>
}