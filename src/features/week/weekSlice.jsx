import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getWeeks = createAsyncThunk("week/getWeeks", async (thunkAPI) => {
  try {
    const res = await axios.get("https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/currentweeks", {
      withCredentials: true,
    })
    return { weeks: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

const getViewingWeekFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("viewingWeek")) || 1
}

const initialState = {
  nflSeason: 2024,
  nflWeek: 1,
  mlbSeason: 2024,
  mlbWeek: 1,
  viewingWeek: getViewingWeekFromLocalStorage(),
}

const weekSlice = createSlice({
  name: "week",
  initialState,
  reducers: {
    changeViewingWeek: (state, action) => {
      const { newWeek } = action.payload
      state.viewingWeek = newWeek
      localStorage.setItem("viewingWeek", JSON.stringify(newWeek))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeeks.pending, (state) => {})
      .addCase(getWeeks.fulfilled, (state, action) => {
        const { weeks } = action.payload
        state.nflSeason = weeks["nfl_season"]
        state.nflWeek = weeks["nfl_week"]
        state.mlbSeason = weeks["mlb_season"]
        state.mlbWeek = weeks["mlb_week"]
        localStorage.setItem("viewingWeek", JSON.stringify(weeks["nfl_week"]))
      })
      .addCase(getWeeks.rejected, (state) => {})
  },
})

export const { changeViewingWeek } = weekSlice.actions

export const weekReducer = weekSlice.reducer
