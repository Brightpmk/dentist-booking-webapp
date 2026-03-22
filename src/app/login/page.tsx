"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { loginUser, getMe } from "../../libs/auth"
import { setAuthData } from "../../redux/features/authSlice"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    try {
      const loginResponse = await loginUser({
        email,
        password,
      })

      const meResponse = await getMe(loginResponse.token)

      dispatch(
        setAuthData({
          token: loginResponse.token,
          user: meResponse.data,
        })
      )

      setMessage("Login successful")

      if (meResponse.data.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/booking")
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage("Login failed")
      }
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <br />
        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  )
}