export interface User {
  _id: string
  name: string
  telephoneNumber: string
  email: string
  role: "user" | "admin"
}

export interface RegisterPayload {
  name: string
  telephoneNumber: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthTokenResponse {
  success: boolean
  token: string
}

export interface MeResponse {
  success: boolean
  data: User
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoggedIn: boolean
}