"use client"

import Link from "next/link"
import useAuth from "../libs/useAuth"

export default function HomePage() {
  const { user, role, isLoggedIn } = useAuth()

  return (
    <main className="site-shell">
      <section className="page-section">
        <div className="container hero-grid">
          <div className="panel-dark">
            <div className="eyebrow">Dental booking platform</div>
            <h1 className="display-title">
              Thoughtful booking
              <br />
              for modern dental care.
            </h1>
            <p className="body-lg">
              A calm and structured appointment system for patients and clinic
              staff. Patients manage one personal booking, while administrators
              oversee dentists and all booking records.
            </p>
          </div>

          <div className="info-stack">
            <div className="panel">
              <div className="eyebrow">Access</div>
              <h2 className="section-title">
                {isLoggedIn && user
                  ? `Welcome back, ${user.name}.`
                  : "Simple, role-based access."}
              </h2>
              <p className="body-lg">
                {isLoggedIn && user
                  ? role === "admin"
                    ? "You are signed in as admin. Continue to clinic operations."
                    : "You are signed in as a patient. Continue to your booking page."
                  : "Create an account or sign in to manage your dental booking securely."}
              </p>

              <div className="divider-space" />

              {!isLoggedIn ? (
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/login">
                    <button className="button">Sign In</button>
                  </Link>
                  <Link href="/register">
                    <button className="button-secondary">Create Account</button>
                  </Link>
                </div>
              ) : role === "admin" ? (
                <Link href="/admin">
                  <button className="button">Go to Admin</button>
                </Link>
              ) : (
                <Link href="/booking">
                  <button className="button">Go to My Booking</button>
                </Link>
              )}
            </div>

            <div className="info-card">
              <h3>Patient flow</h3>
              <p className="body-sm">
                Each registered user can create and manage one dental booking
                linked to a selected dentist and booking date.
              </p>
            </div>

            <div className="info-card">
              <h3>Admin flow</h3>
              <p className="body-sm">
                Admin users can manage dentists and review all bookings across
                the clinic system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}