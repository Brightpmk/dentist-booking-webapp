"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import useAuth from "../../libs/useAuth"
import ProtectedRoute from "../../components/ProtectedRoute"
import "../appointment/appointment.css"

export default function UpdatePage() {
  const { token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")

  const [date, setDate] = useState("")
  const [reason, setReason] = useState("")
  const [dentistName, setDentistName] = useState("")
  const [loading, setLoading] = useState(true)

  const getDentistImage = (name: string = "") => {
    if (name.includes("Eunice Maggio")) return "img/dr.eunice.png"
    if (name.includes("Alan Klein")) return "img/dr.alan.png"
    if (name.includes("Debbie Gutmann")) return "img/deddie.png" 
    if (name.includes("Domingo Goodwin")) return "img/dr.domingo.png"
    return "img/dr.sarah.png" 
  }

  useEffect(() => {
    const fetchBookingDetail = async () => {
      if (!bookingId || !token) return
      try {
        const res = await fetch(`https://dentist-backend-two.vercel.app/api/v1/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const result = await res.json()
        if (result.success) {
          const b = result.data
          setDate(b.bookingDate.split('T')[0])
          setReason(b.reason || "")
          setDentistName(b.dentist?.name || "")
        }
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookingDetail()
  }, [bookingId, token])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://dentist-backend-two.vercel.app/api/v1/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          bookingDate: date,
          reason: reason 
        })
      })

      if (response.ok) {
        alert("Booking updated successfully!")
        router.back() 
      } else {
        alert("Failed to update booking")
      }
    } catch (err) {
      alert("An error occurred")
    }
  }

  if (loading) return <div className="appointment-shell">Loading record...</div>

  return (
    <ProtectedRoute>
      <main className="appointment-shell">
        <div className="appointment-container">
          <div className="appointment-info-panel">
            <div>
              <p style={{ color: "#a88d7b", fontWeight: "700", fontSize: "12px", textTransform: "uppercase" }}>
                Update Session
              </p>
              <h1 className="appointment-title">Modify your <br/> appointment.</h1>
              <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
                Update your preferred date or reason for the visit.
              </p>
            </div>

            {dentistName && (
              <div className="selected-dentist-card">
                <img 
                  src={getDentistImage(dentistName)} 
                  alt={dentistName} 
                />
                <div>
                  <p style={{ margin: 0, fontSize: "11px", color: "#a88d7b", fontWeight: "700" }}>DENTIST</p>
                  <h3 style={{ margin: "2px 0" }}>{dentistName}</h3>
                </div>
              </div>
            )}
          </div>

          <div className="appointment-form-panel">
            <form onSubmit={handleUpdate}>
              <div className="form-field">
                <label className="form-label">New Appointment Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-field">
                <label className="form-label">Reason for Visit</label>
                <textarea 
                  className="form-input" 
                  style={{ minHeight: "150px", paddingTop: "10px" }}
                  placeholder="Update your symptoms or reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="appointment-btn">Save Changes</button>
                <button 
                  type="button" 
                  onClick={() => router.back()}
                  className="appointment-btn" 
                  style={{ background: '#f3f4f6', color: '#374151' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}