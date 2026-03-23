"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface Dentist {
  _id: string;
  name: string;
  experienceYears: number; 
  expertise: string;     
}

export default function DentistsPage() {
  const router = useRouter()
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [loading, setLoading] = useState(true)

  // ฟังก์ชันเลือกรูปภาพตามชื่อคุณหมอที่กำหนด
  const getDentistImage = (name: string = "") => {
    if (name.includes("Eunice Maggio")) return "img/dr.eunice.png"
    if (name.includes("Alan Klein")) return "img/dr.alan.png"
    if (name.includes("Debbie Gutmann")) return "img/deddie.png" 
    if (name.includes("Domingo Goodwin")) return "img/dr.domingo.png"
    return "img/dr.sarah.png" 
  }

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch("https://dentist-backend-two.vercel.app/api/v1/dentists")
        const data = await response.json()
        if (data.success) {
          setDentists(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch dentists:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDentists()
  }, [])

  return (
    <main className="site-shell">
      <div className="dentist-container">
        
        <h1 className="dentist-title">MEET OUR DENTISTS</h1>
        
        <p className="dentist-instruction">
            Click on a dentist to book an appointment with them.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#1e2f44' }}>
            <div className="loader">Loading specialist data...</div>
          </div>
        ) : (
          <div className="dentist-grid">
            {dentists.map((dentist) => (
              <div
                key={dentist._id}
                onClick={() => router.push(`/appointment?dentistId=${dentist._id}`)}
                className="dentist-card"
              >
                <div className="dentist-image-frame">
                  <img 
                    src={getDentistImage(dentist.name)} 
                    alt={dentist.name} 
                  />
                </div>

                <div className="dentist-info-header">
                  <h3 className="dentist-name">{dentist.name}</h3>
                  <span className="dentist-year">{dentist.experienceYears} yrs</span>
                </div>
                
                <p className="dentist-details">
                  {dentist.expertise} • {dentist.experienceYears} Years Experience
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}