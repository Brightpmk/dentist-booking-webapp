"use client"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import ProtectedRoute from "../../components/ProtectedRoute"
import LogoutButton from "../../components/LogoutButton"

export default function AdminPage() {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <ProtectedRoute requireAdmin={true}>
      <div>
        <h1>Admin Page</h1>
        <p>Current User: {auth.user ? auth.user.name : "No user"}</p>
        <p>Role: {auth.user ? auth.user.role : "No role"}</p>
        <LogoutButton />
      </div>
    </ProtectedRoute>
  )
}