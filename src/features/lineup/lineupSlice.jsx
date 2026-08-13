import { createSlice } from "@reduxjs/toolkit"
import { getStoredJSON, setStoredJSON, removeStoredJSON } from "../../utils/localStorage"

const getLineupInfoFromLocalStorage = () => ({
  lineup: getStoredJSON("lineup", null),
  selectionIndex: getStoredJSON("selectionIndex", 0),
  position: getStoredJSON("position", ""),
  teamFilter: getStoredJSON("teamFilter", ""),
  page: getStoredJSON("page", 1),
  lineupLoading: false,
})

const initialState = getLineupInfoFromLocalStorage()

const lineupSlice = createSlice({
  name: "lineup",
  initialState,
  reducers: {
    getLineup: (state, action) => {
      const { lineup, selectionIndex, position } = action.payload
      state.lineup = lineup
      setStoredJSON("lineup", lineup)
      state.selectionIndex = selectionIndex
      setStoredJSON("selectionIndex", selectionIndex)
      state.position = position
      setStoredJSON("position", position)
    },
    clearLineup: (state, action) => {
      state.lineup = null
      removeStoredJSON("lineup")
      state.selectionIndex = null
      removeStoredJSON("selectionIndex")
      state.position = ""
      removeStoredJSON("position")
    },
    filterByTeam: (state, action) => {
      const { teamFilter } = action.payload
      state.teamFilter = teamFilter
      setStoredJSON("teamFilter", teamFilter)
    },
    clearTeamFilter: (state, action) => {
      state.teamFilter = ""
      removeStoredJSON("teamFilter")
    },
    lineupLoadingTrue: (state, action) => {
      state.lineupLoading = true
    },
    lineupLoadingFalse: (state, action) => {
      state.lineupLoading = false
    },
    changePage: (state, action) => {
      const { page } = action.payload
      state.page = page
      setStoredJSON("page", page)
    },
  },
})

export const {
  getLineup,
  clearLineup,
  filterByTeam,
  clearTeamFilter,
  lineupLoadingTrue,
  lineupLoadingFalse,
  changePage,
} = lineupSlice.actions

export const lineupReducer = lineupSlice.reducer
