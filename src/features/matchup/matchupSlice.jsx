import { createSlice } from "@reduxjs/toolkit"

const getMatchupInfoFromLocalStorage = () => {
  const matchupId = JSON.parse(localStorage.getItem("matchupId")) || null
  return { matchupId }
}

const initialState = getMatchupInfoFromLocalStorage()

const matchupSlice = createSlice({
  name: "matchup",
  initialState,
  reducers: {
    getMatchupId: (state, action) => {
      console.log(action.payload)
      const { matchupId } = action.payload
      state.matchupId = matchupId
      localStorage.setItem("matchupId", JSON.stringify(matchupId))
    },
    clearMatchupId: (state, action) => {
      state.matchupId = null
      localStorage.setItem("matchupId", JSON.stringify(null))
    },
  },
})

export const { getMatchupId, clearMatchupId } = matchupSlice.actions

export const matchupReducer = matchupSlice.reducer
