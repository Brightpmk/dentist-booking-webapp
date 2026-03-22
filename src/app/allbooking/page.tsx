"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../libs/useAuth"
import ProtectedRoute from "../../components/ProtectedRoute"

interface Booking {
  _id: string;
  bookingDate: string;
  user: { name: string };
  dentist: { name: string };
}

export default function AllBookingsPage() {
  const { token } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAllBookings = async () => {
    try {
      const response = await fetch("https://dentist-backend-two.vercel.app/api/v1/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setBookings(Array.isArray(data.data) ? data.data : [data.data].filter(Boolean))
      }
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (token) fetchAllBookings() }, [token])

  const handleUpdateNavigation = (id: string) => {
    router.push(`/update?id=${id}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return

    try {
      const response = await fetch(`https://dentist-backend-two.vercel.app/api/v1/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        setBookings(bookings.filter(b => b._id !== id))
        alert("Deleted successfully")
      }
    } catch (err) { alert("Delete failed") }
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <main className="site-shell">
        <div className="dentist-container">
          <h1 className="dentist-title">ALL CLINIC BOOKINGS</h1>
          <p className="dentist-instruction">Full visibility and administrative control over all records.</p>

          {loading ? <p>Loading records...</p> : (
            <div className="booking-list">
              {bookings.length === 0 ? <p>No bookings found.</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#1e2f44' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                      <th style={{ padding: '15px' }}>Patient</th>
                      <th style={{ padding: '15px' }}>Dentist</th>
                      <th style={{ padding: '15px' }}>Date</th>
                      <th style={{ padding: '15px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                        <td style={{ padding: '15px' }}>{booking.user?.name || "N/A"}</td>
                        <td style={{ padding: '15px' }}>{booking.dentist?.name || "N/A"}</td>
                        <td style={{ padding: '15px' }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                        <td style={{ padding: '15px' }}>
                          <button 
                            onClick={() => handleUpdateNavigation(booking._id)} 
                            className="edit-btn" 
                            style={{ marginRight: '10px', color: '#a88d7b', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(booking._id)} 
                            className="delete-btn" 
                            style={{ color: '#e11d48', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  )
}