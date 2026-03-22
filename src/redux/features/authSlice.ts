import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, User } from "../../../interface"

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isLoggedIn = true
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
    setAuthData: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLoggedIn = true
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
    },
  },
})

export const { setToken, setCurrentUser, setAuthData, clearAuth } =
  authSlice.actions
export default authSlice.reducer