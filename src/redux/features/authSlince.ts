import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export default authSlice.reducer