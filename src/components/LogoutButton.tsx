"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { logoutUser } from "../libs/auth"
import { clearAuth } from "../redux/features/authSlice"

export default function LogoutButton() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch {}

    dispatch(clearAuth())
    router.push("/login")
  }

  return (
    <button className="button-secondary" onClick={handleLogout}>
      Log-out
    </button>
  )
}