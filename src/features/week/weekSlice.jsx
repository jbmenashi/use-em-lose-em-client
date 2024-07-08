import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getWeeks = createAsyncThunk("week/getWeeks", async (thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:8000/currentweeks", {
      withCredentials: true,
    })
    return { weeks: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

const getUserIdFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userId")) || ""
}

const initialState = {
  nflSeason: 2024,
  nflWeek: 1,
  mlbSeason: 2024,
  mlbWeek: 1,
}

const weekSlice = createSlice({
  name: "week",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeeks.pending, (state) => {})
      .addCase(getWeeks.fulfilled, (state, action) => {
        const { weeks } = action.payload
        state.nflSeason = weeks["nfl_season"]
        state.nflWeek = weeks["nfl_week"]
        state.mlbSeason = weeks["mlb_season"]
        state.mlbWeek = weeks["mlb_week"]
      })
      .addCase(getWeeks.rejected, (state) => {})
  },
})

export const weekReducer = weekSlice.reducer
