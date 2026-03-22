import {
  AuthTokenResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
} from "../../interface"
import { BASE_URL } from "./api"

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthTokenResponse> {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.msg || "Register failed")
  }
  return data
}

export async function loginUser(
  payload: LoginPayload
): Promise<AuthTokenResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.msg || "Login failed")
  }
  return data
}

export async function getMe(token: string): Promise<MeResponse> {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.msg || "Get current user failed")
  }

  return data
}

export async function logoutUser() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "GET",
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.msg || "Logout failed")
  }

  return data
}

