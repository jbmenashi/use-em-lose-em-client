import { createSlice } from "@reduxjs/toolkit"

const getLineupInfoFromLocalStorage = () => {
  const lineup = JSON.parse(localStorage.getItem("lineup")) || null
  const selectionIndex = JSON.parse(localStorage.getItem("selectionIndex")) || 0
  const position = JSON.parse(localStorage.getItem("position")) || ""
  const teamFilter = ""
  const page = JSON.parse(localStorage.getItem("page")) || 1
  const lineupLoading = false
  return { lineup, selectionIndex, position, teamFilter, page, lineupLoading }
}

const initialState = getLineupInfoFromLocalStorage()

const lineupSlice = createSlice({
  name: "lineup",
  initialState,
  reducers: {
    getLineup: (state, action) => {
      const { lineup, selectionIndex, position } = action.payload
      state.lineup = lineup
      localStorage.setItem("lineup", JSON.stringify(lineup))
      state.selectionIndex = selectionIndex
      localStorage.setItem("selectionIndex", JSON.stringify(selectionIndex))
      state.position = position
      localStorage.setItem("position", JSON.stringify(position))
    },
    clearLineup: (state, action) => {
      state.lineup = null
      localStorage.setItem("lineup", JSON.stringify(null))
      state.selectionIndex = null
      localStorage.setItem("selectionIndex", JSON.stringify(null))
      state.position = ""
      localStorage.setItem("position", JSON.stringify(""))
    },
    filterByTeam: (state, action) => {
      const { teamFilter } = action.payload
      state.teamFilter = teamFilter
      localStorage.setItem("teamFilter", JSON.stringify(teamFilter))
    },
    clearTeamFilter: (state, action) => {
      state.teamFilter = ""
      localStorage.setItem("teamFilter", JSON.stringify(""))
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
      localStorage.setItem("page", JSON.stringify(page))
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
