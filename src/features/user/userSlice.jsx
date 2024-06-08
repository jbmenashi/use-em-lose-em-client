import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getUser = createAsyncThunk("user/getUser", async (name, thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:8000/users/me", {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

const initialState = {
  user: false,
  userName: "",
  userId: "",
  isLoading: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { id, email } = action.payload
      state.user = true
      state.userName = email
      state.userId = id
    },
    logoutUser: (state, action) => {
      console.log(action.payload)
      state.user = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { id, email } = action.payload
        state.user = true
        state.userName = email
        state.userId = id
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { loginUser, logoutUser } = userSlice.actions

export const userReducer = userSlice.reducer
