import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

// export const { } = userSlice.actions

export const userReducer = userSlice.reducer
