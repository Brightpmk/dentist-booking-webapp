"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import useAuth from "../../libs/useAuth" 
import ProtectedRoute from "../../components/ProtectedRoute" 
import "./appointment.css"

interface Dentist {
  _id: string;
  name: string;
  expertise: string;
  experienceYears: number;
}

export default function AppointmentPage() {
  const { token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialId = searchParams.get("dentistId")
  
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [selectedId, setSelectedId] = useState<string>("")
  const [date, setDate] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch("https://dentist-backend-two.vercel.app/api/v1/dentists")
        const result = await response.json()
        if (result.success) {
          setDentists(result.data)
          setSelectedId(initialId || result.data[0]?._id || "")
        }
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDentists()
  }, [initialId])

  const selectedDentist = dentists.find(d => d._id === selectedId)

  const getDentistImage = (name: string = "") => {
    if (name.includes("Eunice Maggio")) return "img/dr.eunice.png"
    if (name.includes("Alan Klein")) return "img/dr.alan.png"
    if (name.includes("Debbie Gutmann")) return "img/deddie.png" 
    if (name.includes("Domingo Goodwin")) return "img/dr.domingo.png"
    return "img/dr.sarah.png" 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return alert("Please log in to manage your dental booking")

    try {
      const response = await fetch(`https://dentist-backend-two.vercel.app/api/v1/dentists/${selectedId}/bookings`, {
        method: "POST",
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
        alert("Appointment created successfully!")
        router.push("/booking")
      } else {
        const res = await response.json()
        alert(res.message || "Each user can hold one booking at a time")
      }
    } catch (err) { alert("An error occurred") }
  }

  if (loading) return <div className="appointment-shell">Loading clinic data...</div>

  return (
    <ProtectedRoute>
      <main className="appointment-shell">
        <div className="appointment-container">
          <div className="appointment-info-panel">
            <div>
              <p style={{ color: "#a88d7b", fontWeight: "700", fontSize: "12px", textTransform: "uppercase" }}>
                Secure Access
              </p>
              <h1 className="appointment-title">Create your <br/> appointment.</h1>
              <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
                Ready for dentist selection flow. One user, one booking rule.
              </p>
            </div>

            {selectedDentist && (
              <div className="selected-dentist-card">
                <img 
                  src={getDentistImage(selectedDentist.name)} 
                  alt={selectedDentist.name} 
                />
                <div>
                  <p style={{ margin: 0, fontSize: "11px", color: "#a88d7b", fontWeight: "700" }}>CURRENT SELECTION</p>
                  <h3 style={{ margin: "2px 0" }}>{selectedDentist.name}</h3>
                  <p style={{ margin: 0, fontSize: "13px", opacity: 0.6 }}>{selectedDentist.expertise}</p>
                </div>
              </div>
            )}
          </div>

          <div className="appointment-form-panel">
            <form onSubmit={handleSubmit}>
              
              <div className="form-field">
                <label className="form-label">Select Dentist</label>
                <select className="form-input" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                  {dentists.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Appointment Date</label>
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
                  placeholder="e.g. Annual checkup, toothache..."
                  style={{ minHeight: "120px", paddingTop: "10px" }}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="appointment-btn">Confirm Appointment</button>
            </form>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}