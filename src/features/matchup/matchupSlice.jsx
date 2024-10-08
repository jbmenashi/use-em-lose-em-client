import { createSlice } from "@reduxjs/toolkit"

const getMatchupInfoFromLocalStorage = () => {
  const matchupId = JSON.parse(localStorage.getItem("matchupId")) || null
  const matchupIdUser = JSON.parse(localStorage.getItem("matchupIdUser")) || null
  const isUserMatchup = JSON.parse(localStorage.getItem("isUserMatchup")) || false
  return { matchupId, matchupIdUser, isUserMatchup }
}

const initialState = getMatchupInfoFromLocalStorage()

const matchupSlice = createSlice({
  name: "matchup",
  initialState,
  reducers: {
    getMatchupId: (state, action) => {
      const { matchupId } = action.payload
      state.matchupId = matchupId
      localStorage.setItem("matchupId", JSON.stringify(matchupId))
    },
    getMatchupIdUser: (state, action) => {
      const { matchupIdUser } = action.payload
      state.matchupIdUser = matchupIdUser
      localStorage.setItem("matchupIdUser", JSON.stringify(matchupIdUser))
    },
    clearMatchupInfo: (state, action) => {
      state.matchupId = null
      localStorage.setItem("matchupId", JSON.stringify(null))
      state.matchupIdUser = null
      localStorage.setItem("matchupIdUser", JSON.stringify(null))
    },
    trueIsUserMatchup: (state) => {
      state.isUserMatchup = true
    },
    falseIsUserMatchup: (state) => {
      state.isUserMatchup = false
    },
  },
})

export const { getMatchupId, getMatchupIdUser, clearMatchupInfo, trueIsUserMatchup, falseIsUserMatchup } =
  matchupSlice.actions

export const matchupReducer = matchupSlice.reducer
