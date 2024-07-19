import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  lineup: null,
  index: null,
  position: null,
  page: 1,
}

const lineupSlice = createSlice({
  name: "lineup",
  initialState,
  reducers: {
    getLineup: (state, action) => {
      const { lineup, index, position } = action.payload
      state.lineup = lineup
      state.index = index
      state.position = position
    },
    clearLineup: (state, action) => {
      state = initialState
    },
  },
})

export const { getLineup, clearLineup } = lineupSlice.actions

export const lineupReducer = lineupSlice.reducer
