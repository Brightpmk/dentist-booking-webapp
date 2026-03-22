"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { registerUser } from "../../libs/auth"
import { RootState } from "../../redux/store"

export default function RegisterPage() {
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth)

  const [name, setName] = useState("")
  const [telephoneNumber, setTelephoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      router.push(auth.user.role === "admin" ? "/admin" : "/booking")
    }
  }, [auth, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    try {
      await registerUser({
        name,
        telephoneNumber,
        email,
        password,
      })

      setMessage("Account created successfully")
      router.push("/login")
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage("Register failed")
      }
    }
  }

  return (
    <main className="site-shell">
      <div className="split-layout">
        <section className="auth-side">
          <div>
            <div className="eyebrow">New account</div>
            <h1>
              Create your
              <br />
              patient access.
            </h1>
            <p>
              Register once to access the clinic system, select a dentist, and
              manage your personal dental booking.
            </p>

            <div className="auth-facts">
              <div className="auth-fact">Secure account registration</div>
              <div className="auth-fact">One user, one booking rule</div>
              <div className="auth-fact">Ready for dentist selection flow</div>
            </div>
          </div>

          <p className="body-sm">Dentaire Clinic System</p>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <h2>Create Account</h2>
            <p>Set up your account to begin using the dental booking system.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telephone number</label>
                <input
                  className="input"
                  value={telephoneNumber}
                  onChange={(e) => setTelephoneNumber(e.target.value)}
                  type="text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>

              <button className="button" type="submit">
                Create Account
              </button>
            </form>

            {message && (
              <p
                className="message"
                style={{
                  color: message.toLowerCase().includes("failed")
                    ? "var(--danger)"
                    : "var(--success)",
                }}
              >
                {message}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}