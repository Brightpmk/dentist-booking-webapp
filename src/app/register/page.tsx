"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "../../libs/auth"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [telephoneNumber, setTelephoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

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

      setMessage("Register successful")
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
    <div>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>Telephone Number</label>
          <br />
          <input
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(e.target.value)}
            type="text"
          />
        </div>

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
        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  )
}