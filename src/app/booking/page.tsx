"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "../../components/ProtectedRoute"
import useAuth from "../../libs/useAuth"
import { useRouter } from "next/navigation" 

interface Booking {
  _id: string;
  bookingDate: string;
  user: { name: string; _id: string };
  dentist: { name: string; expertise: string; _id: string };
}

export default function BookingPage() {
  const { user, token } = useAuth()
  const router = useRouter() // 2. ประกาศใช้งาน router
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const API_URL = "https://dentist-backend-two.vercel.app/api/v1/bookings"

  const fetchBookings = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setBookings(Array.isArray(data.data) ? data.data : [data.data].filter(Boolean))
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (token) fetchBookings() }, [token])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchBookings() 
    } catch (err) { alert("Delete failed") }
  }

  return (
    <ProtectedRoute>
      <main className="site-shell">
        <section className="page-section">
          <div className="container dashboard-grid">
            <div className="panel">
              <div className="eyebrow">
                {user?.role === 'admin' ? "System Overview" : "My booking"}
              </div>
              <h1 className="section-title">
                {user?.role === 'admin' ? "All Appointments." : "Your booking record."}
              </h1>
              
              <div className="divider-space" />

              {loading ? (
                <p>Loading appointments...</p>
              ) : bookings.length > 0 ? (
                bookings.map((b) => (
                  <div key={b._id} className="booking-item-card">
                    <div className="dentist-info-small">
                      <div>
                        <h4 style={{ margin: 0 }}>{b.dentist?.name || "Dentist Name"}</h4>
                        <p className="body-sm" style={{ margin: 0 }}>
                          {new Date(b.bookingDate).toLocaleDateString()} • {b.dentist?.expertise}
                        </p>
                        {user?.role === 'admin' && (
                          <p className="body-xs" style={{ color: "#888", marginTop: "4px" }}>
                            Patient: <strong>{b.user?.name}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="booking-actions">
                      <button 
                        className="btn-edit" 
                        onClick={() => router.push(`/update?id=${b._id}`)}
                      >
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(b._id)}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="info-card">
                  <p className="body-sm">No appointments found. Start by making one!</p>
                </div>
              )}
            </div>

            <div className="info-stack">
              <div className="panel-dark">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="eyebrow">Status Panel</div>
                    {user?.role === 'admin' && <span className="admin-badge">Admin Mode</span>}
                </div>
                <h2 className="section-title" style={{ color: "white" }}>
                  {user?.role === 'admin' ? "Global Management" : "Booking access"}
                </h2>
                <p className="body-sm" style={{ color: "rgba(255,255,255,0.76)" }}>
                  {user?.role === 'admin' 
                    ? "You have full authority to oversee and modify all clinic schedules." 
                    : "Manage your single active booking. Remember: one user, one booking rule."}
                </p>

                <div className="divider-space" />

                <div className="metric-grid">
                  <div className="metric-card">
                    <div className="metric-value">{bookings.length}</div>
                    <div className="metric-label">{user?.role === 'admin' ? "Total Bookings" : "Your Active Booking"}</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value">LIVE</div>
                    <div className="metric-label">API Status</div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Quick Actions</h3>
                <p className="body-sm">
                  Need help? Contact the support team or visit our FAQ for more details.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  )
}