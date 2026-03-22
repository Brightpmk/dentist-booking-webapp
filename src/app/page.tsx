"use client"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export default function HomePage() {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <div>
      <h1>Dentist Booking Home Page</h1>
      {auth.isLoggedIn && auth.user ? (
        <>
          <p>Welcome, {auth.user.name}</p>
          <p>Your role is {auth.user.role}</p>
        </>
      ) : (
        <p>Please login or register to continue</p>
      )}
    </div>
  )
}