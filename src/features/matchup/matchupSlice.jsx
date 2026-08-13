import { createSlice } from "@reduxjs/toolkit"
import { getStoredJSON, setStoredJSON, removeStoredJSON } from "../../utils/localStorage"

const getMatchupInfoFromLocalStorage = () => ({
  matchupIdUser: getStoredJSON("matchupIdUser", null),
})

const initialState = getMatchupInfoFromLocalStorage()

const matchupSlice = createSlice({
  name: "matchup",
  initialState,
  reducers: {
    getMatchupIdUser: (state, action) => {
      const { matchupIdUser } = action.payload
      state.matchupIdUser = matchupIdUser
      setStoredJSON("matchupIdUser", matchupIdUser)
    },
    clearMatchupInfo: (state, action) => {
      state.matchupIdUser = null
      removeStoredJSON("matchupIdUser")
    },
  },
})

export const { getMatchupIdUser, clearMatchupInfo } = matchupSlice.actions

export const matchupReducer = matchupSlice.reducer
