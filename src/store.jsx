import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./features/user/userSlice"
import { leagueReducer } from "./features/league/leagueSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    league: leagueReducer,
  },
})
