import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        <Link href="/register">Go to Register</Link>
      </p>
      <p>
        <Link href="/login">Go to Login</Link>
      </p>
    </div>
  )
}