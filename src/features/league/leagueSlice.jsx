import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const getLeagueInfoFromLocalStorage = () => {
  const league = {}
  league["leagueId"] = JSON.parse(localStorage.getItem("leagueId")) || null
  league["leagueName"] = JSON.parse(localStorage.getItem("leagueName")) || ""
  league["teamId"] = JSON.parse(localStorage.getItem("teamId")) || null
  league["teamName"] = JSON.parse(localStorage.getItem("teamName")) || ""
  return league
}

const initialState = getLeagueInfoFromLocalStorage()

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    getLeagueTeamInfo: (state, action) => {
      const { league_id, league_name, contestant_id, team_name } = action.payload
      state.leagueId = league_id
      localStorage.setItem("leagueId", JSON.stringify(league_id))
      state.leagueName = league_name
      localStorage.setItem("leagueName", JSON.stringify(league_name))
      state.teamId = contestant_id
      localStorage.setItem("teamId", JSON.stringify(contestant_id))
      state.teamName = team_name
      localStorage.setItem("teamName", JSON.stringify(team_name))
    },
    clearLeagueTeamInfo: (state, action) => {
      state.leagueId = null
      state.leagueName = ""
      state.teamId = null
      state.teamName = ""
    },
  },
})

export const { getLeagueTeamInfo, clearLeagueTeamInfo } = leagueSlice.actions

export const leagueReducer = leagueSlice.reducer
