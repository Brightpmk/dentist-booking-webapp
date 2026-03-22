"use client"

import ProtectedRoute from "../../components/ProtectedRoute"
import useAuth from "../../libs/useAuth"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

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
                Signed in as {user?.name}. Admin workspace for centralized clinic management.
              </p>

              <div className="divider-space" />

              <div className="admin-stat-grid">
                <div className="admin-stat">
                  <div className="body-sm">Booking visibility</div>
                  <div className="value">All</div>
                </div>
                <div className="admin-stat">
                  <div className="body-sm">System rule</div>
                  <div className="value">Admin</div>
                </div>
              </div>
            </div>

            <div className="info-stack">
              <div className="panel">
                <div className="eyebrow">Management</div>
                <h2 className="section-title">Operational Tools.</h2>
                <p className="body-lg">
                  Access and manage all clinic bookings directly.
                </p>
              </div>

              <div className="info-card">
                <h3>View All Bookings</h3>
                <p className="body-sm" style={{ marginBottom: '15px' }}>
                  Monitor, update, or delete any appointment in the system.
                </p>
                <button 
                  onClick={() => router.push('/booking')}
                  className="button" 
                  style={{ width: '100%', padding: '12px', cursor: 'pointer' }}
                >
                  View every booking
                </button>
              </div>
            </div>

          </div> 
        </section> 
      </main> 
    </ProtectedRoute>
  )
}