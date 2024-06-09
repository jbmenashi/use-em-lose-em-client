import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getUser = createAsyncThunk("user/getUser", async (thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:8000/users/me", {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

// export const getLeagues = createAsyncThunk("user/getLeagues", async (userId, thunkAPI) => {
//   try {
//     const res = await axios.get(`http://localhost:8000/contestant/user/${userId}`, {
//       withCredentials: true,
//     })
//     return res.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue("something went wrong")
//   }
// })

const initialState = {
  user: false,
  userName: "",
  userId: "",
  isLoading: false,
  leagues: [],
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
      state.user = false
    },
    loadLeagues: (state, action) => {
      state.leagues = action.payload
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

export const { loginUser, logoutUser, loadLeagues } = userSlice.actions

export const userReducer = userSlice.reducer
