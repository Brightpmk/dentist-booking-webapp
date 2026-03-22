"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import LogoutButton from "./LogoutButton"

export default function TopMenu() {
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand">
          <Link href="/">
            Denta<span className="brand-mark">ire</span>
          </Link>
        </div>

        <nav className="nav-center">
          <Link className="nav-link" href="/">
            Overview
          </Link>

          {!auth.isLoggedIn && (
            <>
              <Link className="nav-link" href="/login">
                Log-in
              </Link>
              <Link className="nav-link" href="/register">
                Create Account
              </Link>
            </>
          )}

          {auth.isLoggedIn && auth.user?.role === "user" && (
            <Link className="nav-link" href="/booking">
              Appointments
            </Link>
          )}

          {auth.isLoggedIn && auth.user?.role === "admin" && (
            <Link className="nav-link" href="/admin">
              Operations
            </Link>
          )}
        </nav>

        <div className="nav-right">
          {auth.isLoggedIn && auth.user ? (
            <>
              <div className="user-chip">
                <div>
                  <div className="font-serif">
                    {auth.user.name}
                  </div>

                  <div className="user-role font-serif-italic accent-text">
                    {auth.user.role}
                  </div>
                </div>
              </div>
              <LogoutButton />
            </>
          ) : (
            <div className="body-sm">Secure patient access</div>
          )}
        </div>
      </div>
    </header>
  )
}