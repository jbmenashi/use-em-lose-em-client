import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/client"

export const getLeagues = createAsyncThunk("user/getLeagues", async (_, thunkAPI) => {
  try {
    const res = await api.get("/contestants/me")
    return { leagues: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

const initialState = {
  isLoading: false,
  leagues: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadLeagues: (state, action) => {
      state.leagues = action.payload
    },
    clearLeagues: (state) => {
      state.leagues = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeagues.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLeagues.fulfilled, (state, action) => {
        const { leagues } = action.payload
        state.isLoading = false
        state.leagues = leagues
      })
      .addCase(getLeagues.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { loadLeagues, clearLeagues } = userSlice.actions

export const userReducer = userSlice.reducer
