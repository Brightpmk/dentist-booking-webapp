"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, getMe } from "../../libs/auth"
import { setAuthData } from "../../redux/features/authSlice"
import { RootState } from "../../redux/store"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

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
      const loginResponse = await loginUser({ email, password })
      const meResponse = await getMe(loginResponse.token)

      dispatch(
        setAuthData({
          token: loginResponse.token,
          user: meResponse.data,
        })
      )

      router.push(meResponse.data.role === "admin" ? "/admin" : "/booking")
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage("Login failed")
      }
    }
  }

  return (
    <main className="site-shell">
      <div className="split-layout">
        <section className="auth-side">
          <div>
            <div className="eyebrow">Patient and admin access</div>
            <h1>
              Sign in to
              <br />
              continue.
            </h1>
            <p>
              Access your dental booking account or clinic administration area
              through a clear and secure role-based sign-in flow.
            </p>

            <div className="auth-facts">
              <div className="auth-fact">Patients manage one personal booking</div>
              <div className="auth-fact">Admins can manage dentists and all bookings</div>
              <div className="auth-fact">Protected route access by role</div>
            </div>
          </div>

          <p className="body-sm">Dentaire Clinic System</p>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <h2>Sign In</h2>
            <p>Enter your account details to access the dental booking system.</p>

            <form onSubmit={handleSubmit}>
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
                Continue
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