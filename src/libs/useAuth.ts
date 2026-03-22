"use client"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export default function useAuth() {
  const auth = useSelector((state: RootState) => state.auth)

  return {
    user: auth.user,
    token: auth.token,
    isLoggedIn: auth.isLoggedIn,
    role: auth.user?.role || null,
  }
}