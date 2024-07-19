import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./features/user/userSlice"
import { leagueReducer } from "./features/league/leagueSlice"
import { weekReducer } from "./features/week/weekSlice"
import { lineupReducer } from "./features/lineup/lineupSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    league: leagueReducer,
    week: weekReducer,
    lineup: lineupReducer,
  },
})
