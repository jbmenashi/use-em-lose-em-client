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

import ErrorElement from "./components/ErrorElement"

import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as createLeagueAction } from "./pages/CreateLeague"
import { action as joinLeagueAction } from "./components/JoinLeagueCard"
import { action as playerSearchAction } from "./pages/PlayerSearch"

import { loader as homeLoader } from "./pages/Home"
import { loader as joinLeagueLoader } from "./pages/JoinLeague"
import { loader as leagueHomeLoader } from "./pages/LeagueHome"
import { loader as teamHomeLoader } from "./pages/TeamHome"
import { loader as playerSearchLoader } from "./pages/PlayerSearch"
import { loader as matchupLoader } from "./pages/Matchup"

import { store } from "./store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./features/user/userSlice"
import { getWeeks } from "./features/week/weekSlice"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorElement />,
        loader: homeLoader(store),
      },
      {
        path: "/createleague",
        element: <CreateLeague />,
        errorElement: <ErrorElement />,
        action: createLeagueAction(store),
      },
      {
        path: "/joinleague",
        element: <JoinLeague />,
        errorElement: <ErrorElement />,
        loader: joinLeagueLoader(store),
        action: joinLeagueAction(store),
      },
    ],
  },
  {
    path: "/leagues/:league_id",
    element: <League />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/leagues/:league_id",
        element: <LeagueHome />,
        errorElement: <ErrorElement />,
        loader: leagueHomeLoader(store),
      },
      {
        path: "/leagues/:league_id/teams/:team_id",
        element: <TeamHome />,
        errorElement: <ErrorElement />,
        loader: teamHomeLoader(store),
      },
      {
        path: "/leagues/:league_id/teams/:team_id/playersearch",
        element: <PlayerSearch />,
        errorElement: <ErrorElement />,
        loader: playerSearchLoader(store),
        action: playerSearchAction(store),
      },
      {
        path: "/leagues/:league_id/matchups/:matchup_id",
        element: <Matchup />,
        errorElement: <ErrorElement />,
        loader: matchupLoader(store),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorElement />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorElement />,
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
