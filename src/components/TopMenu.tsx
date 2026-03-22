"use client"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import TopMenuItem from "./TopMenuItem"
import LogoutButton from "./LogoutButton"

export default function TopMenu() {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <div
      style={{
        padding: "16px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
      }}
    >
      <TopMenuItem title="Home" pageRef="/" />

      {!auth.isLoggedIn && (
        <>
          <TopMenuItem title="Register" pageRef="/register" />
          <TopMenuItem title="Login" pageRef="/login" />
        </>
      )}

      {auth.isLoggedIn && auth.user?.role !== "admin" && (
        <TopMenuItem title="Booking" pageRef="/booking" />
      )}

      {auth.isLoggedIn && auth.user?.role === "admin" && (
        <TopMenuItem title="Admin" pageRef="/admin" />
      )}

      <div style={{ marginTop: "12px" }}>
        {auth.isLoggedIn && auth.user ? (
          <>
            <span style={{ marginRight: "12px" }}>
              Signed in as: {auth.user.name} ({auth.user.role})
            </span>
            <LogoutButton />
          </>
        ) : (
          <span>Not signed in</span>
        )}
      </div>
    </div>
  )
}