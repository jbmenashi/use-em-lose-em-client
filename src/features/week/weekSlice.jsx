import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/client"
import { getStoredJSON, setStoredJSON } from "../../utils/localStorage"

export const getWeeks = createAsyncThunk("week/getWeeks", async (_, thunkAPI) => {
  try {
    const res = await api.get("/weeks/current")
    return { weeks: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

const initialState = {
  nflSeason: 2024,
  nflWeek: 1,
  mlbSeason: 2024,
  mlbWeek: 1,
  viewingWeek: getStoredJSON("viewingWeek", 1),
}

const weekSlice = createSlice({
  name: "week",
  initialState,
  reducers: {
    changeViewingWeek: (state, action) => {
      const { newWeek } = action.payload
      state.viewingWeek = newWeek
      setStoredJSON("viewingWeek", newWeek)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeeks.pending, (state) => {})
      .addCase(getWeeks.fulfilled, (state, action) => {
        const weeks = action.payload?.weeks
        if (!weeks) return
        if (weeks.nflSeason != null) state.nflSeason = weeks.nflSeason
        if (weeks.nflWeek != null) state.nflWeek = weeks.nflWeek
        if (weeks.mlbSeason != null) state.mlbSeason = weeks.mlbSeason
        if (weeks.mlbWeek != null) state.mlbWeek = weeks.mlbWeek
        if (weeks.nflWeek != null) {
          state.viewingWeek = weeks.nflWeek
          setStoredJSON("viewingWeek", weeks.nflWeek)
        }
      })
      .addCase(getWeeks.rejected, (state) => {})
  },
})

export const { changeViewingWeek } = weekSlice.actions

export const weekReducer = weekSlice.reducer
