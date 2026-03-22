"use client"

import ProtectedRoute from "../../components/ProtectedRoute"
import useAuth from "../../libs/useAuth"

export default function BookingPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <main className="site-shell">
        <section className="page-section">
          <div className="container dashboard-grid">
            <div className="panel">
              <div className="eyebrow">My booking</div>
              <h1 className="section-title">Your booking record.</h1>
              <p className="body-lg">
                Welcome back{user ? `, ${user.name}` : ""}. This page is reserved
                for your personal dental booking. According to the current system
                rules, each user can hold one booking at a time.
              </p>

              <div className="divider-space" />

              <div className="info-card">
                <h3>Booking rule</h3>
                <p className="body-sm">
                  Each registered patient is allowed to create only one booking.
                  Booking details on this page should reflect that single active
                  record from the backend.
                </p>
              </div>

              <div className="divider-space" />

              <div className="info-card">
                <h3>Integration note</h3>
                <p className="body-sm">
                  This area is ready for the booking module to display the selected
                  dentist, booking date, and edit/delete actions from the real API.
                </p>
              </div>
            </div>

            <div className="info-stack">
              <div className="panel-dark">
                <div className="eyebrow">Patient profile</div>
                <h2 className="section-title" style={{ color: "white" }}>
                  Booking access
                </h2>
                <p
                  className="body-sm"
                  style={{ color: "rgba(255,255,255,0.76)" }}
                >
                  This page is protected for authenticated users and is designed
                  specifically around a one-booking-per-user workflow.
                </p>

                <div className="divider-space" />

                <div className="metric-grid">
                  <div className="metric-card">
                    <div className="metric-value">01</div>
                    <div className="metric-label">Booking limit per user</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value">API</div>
                    <div className="metric-label">Ready for live booking data</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value">User</div>
                    <div className="metric-label">Protected personal access</div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>What should appear here</h3>
                <p className="body-sm">
                  Dentist name, expertise, booking date, and controls for updating
                  or deleting the current booking.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  )
}