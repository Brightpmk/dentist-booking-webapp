"use client"

import ProtectedRoute from "../../components/ProtectedRoute"
import useAuth from "../../libs/useAuth"

export default function AdminPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute requireAdmin={true}>
      <main className="site-shell">
        <section className="page-section">
          <div className="container dashboard-grid">
            <div className="panel-dark">
              <div className="eyebrow">Clinic administration</div>
              <h1 className="section-title" style={{ color: "white" }}>
                Records and operations
              </h1>
              <p className="body-lg" style={{ color: "rgba(255,255,255,0.76)" }}>
                Signed in as {user?.name}. This admin workspace is aligned with the
                current backend: dentist management, full booking visibility, and
                protected administrative access.
              </p>

              <div className="divider-space" />

              <div className="admin-stat-grid">
                <div className="admin-stat">
                  <div className="body-sm">Dentist records</div>
                  <div className="value">CRUD</div>
                  <div className="body-sm">Create, update, and delete dentists</div>
                </div>

                <div className="admin-stat">
                  <div className="body-sm">Booking visibility</div>
                  <div className="value">All</div>
                  <div className="body-sm">Admin can view every booking</div>
                </div>

                <div className="admin-stat">
                  <div className="body-sm">Booking control</div>
                  <div className="value">Edit</div>
                  <div className="body-sm">Update or remove any booking record</div>
                </div>

                <div className="admin-stat">
                  <div className="body-sm">Cascade rule</div>
                  <div className="value">On</div>
                  <div className="body-sm">
                    Deleting a dentist also removes related bookings
                  </div>
                </div>
              </div>
            </div>

            <div className="info-stack">
              <div className="panel">
                <div className="eyebrow">Backend-aligned design</div>
                <h2 className="section-title">No fake analytics.</h2>
                <p className="body-lg">
                  This interface intentionally avoids invented metrics such as
                  pending approvals or daily dentist counts, because the current
                  backend does not expose that summary data.
                </p>
              </div>

              <div className="info-card">
                <h3>What admin modules should add next</h3>
                <p className="body-sm">
                  Dentist list, booking list, booking detail view, and edit/delete
                  actions connected directly to the real admin API routes.
                </p>
              </div>

              <div className="info-card">
                <h3>System rule</h3>
                <p className="body-sm">
                  Regular users can keep only one booking, while admin users have
                  broader access across the clinic data model.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  )
}