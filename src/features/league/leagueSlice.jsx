import { createSlice } from "@reduxjs/toolkit"
import { getStoredJSON, setStoredJSON, removeStoredJSON } from "../../utils/localStorage"

const getLeagueInfoFromLocalStorage = () => ({
  leagueId: getStoredJSON("leagueId", null),
  leagueName: getStoredJSON("leagueName", ""),
  teamId: getStoredJSON("teamId", null),
  teamName: getStoredJSON("teamName", ""),
})

const initialState = getLeagueInfoFromLocalStorage()

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    getLeagueTeamInfo: (state, action) => {
      const { leagueId, leagueName, contestantId, teamName } = action.payload
      state.leagueId = leagueId
      setStoredJSON("leagueId", leagueId)
      state.leagueName = leagueName
      setStoredJSON("leagueName", leagueName)
      state.teamId = contestantId
      setStoredJSON("teamId", contestantId)
      state.teamName = teamName
      setStoredJSON("teamName", teamName)
    },
    clearLeagueTeamInfo: (state, action) => {
      state.leagueId = null
      removeStoredJSON("leagueId")
      state.leagueName = ""
      removeStoredJSON("leagueName")
      state.teamId = null
      removeStoredJSON("teamId")
      state.teamName = ""
      removeStoredJSON("teamName")
    },
  },
})

export const { getLeagueTeamInfo, clearLeagueTeamInfo } = leagueSlice.actions

export const leagueReducer = leagueSlice.reducer
