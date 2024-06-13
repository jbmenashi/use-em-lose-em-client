import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  leagueId: null,
  leagueName: "",
  teamId: null,
}

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    getLeagueTeamInfo: (state, action) => {
      const { league_id, league_name, contestant_id } = action.payload
      state.leagueId = league_id
      state.leagueName = league_name
      state.teamId = contestant_id
    },
  },
})

export const { getLeagueTeamInfo } = leagueSlice.actions

export const leagueReducer = leagueSlice.reducer
