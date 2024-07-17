import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Base from "./pages/Base"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import League from "./pages/League"
import LeagueHome from "./pages/LeagueHome"
import CreateLeague from "./pages/CreateLeague"
import JoinLeague from "./pages/JoinLeague"
import TeamHome from "./pages/TeamHome"
import PlayerSearch from "./pages/PlayerSearch"
import Matchup from "./pages/Matchup"

import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as createLeagueAction } from "./pages/CreateLeague"
import { action as joinLeagueAction } from "./components/JoinLeagueCard"

import { loader as homeLoader } from "./pages/Home"
import { loader as joinLeagueLoader } from "./pages/JoinLeague"
import { loader as leagueHomeLoader } from "./pages/LeagueHome"

import { store } from "./store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./features/user/userSlice"
import { getWeeks } from "./features/week/weekSlice"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader(store),
      },
      {
        path: "/createleague",
        element: <CreateLeague />,
        action: createLeagueAction(store),
      },
      {
        path: "/joinleague",
        element: <JoinLeague />,
        loader: joinLeagueLoader(store),
        action: joinLeagueAction(store),
      },
    ],
  },
  {
    path: "/leagues/:league_id",
    element: <League />,
    children: [
      {
        path: "/leagues/:league_id",
        element: <LeagueHome />,
        loader: leagueHomeLoader(store),
      },
      {
        path: "/leagues/:league_id/teams/:team_id",
        element: <TeamHome />,
      },
      {
        path: "/leagues/:league_id/teams/:team_id/playersearch",
        element: <PlayerSearch />,
      },
      {
        path: "/leagues/:league_id/matchups/:matchup_id",
        element: <Matchup />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction(store),
  },
])

export default function App() {
  const { isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getWeeks())
  }, [])

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  return <RouterProvider router={router} />
}
