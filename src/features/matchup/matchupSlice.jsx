import { createSlice } from "@reduxjs/toolkit"
import { getStoredJSON, setStoredJSON, removeStoredJSON } from "../../utils/localStorage"

const getMatchupInfoFromLocalStorage = () => ({
  matchupId: getStoredJSON("matchupId", null),
  matchupIdUser: getStoredJSON("matchupIdUser", null),
  isUserMatchup: false,
})

const initialState = getMatchupInfoFromLocalStorage()

const matchupSlice = createSlice({
  name: "matchup",
  initialState,
  reducers: {
    getMatchupId: (state, action) => {
      const { matchupId } = action.payload
      state.matchupId = matchupId
      setStoredJSON("matchupId", matchupId)
    },
    getMatchupIdUser: (state, action) => {
      const { matchupIdUser } = action.payload
      state.matchupIdUser = matchupIdUser
      setStoredJSON("matchupIdUser", matchupIdUser)
    },
    clearMatchupInfo: (state, action) => {
      state.matchupId = null
      removeStoredJSON("matchupId")
      state.matchupIdUser = null
      removeStoredJSON("matchupIdUser")
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
