import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Base from "./pages/Base"
import Home from "./pages/Home"
import HowItWorks from "./pages/HowItWorks"
import Register from "./pages/Register"
import Login from "./pages/Login"
import League from "./pages/League"
import LeagueHome from "./pages/LeagueHome"
import LeagueRules from "./pages/LeagueRules"
import LeagueScoreboard from "./pages/LeagueScoreboard"
import LeagueMatchup from "./pages/LeagueMatchup"
import LeagueUsed from "./pages/LeagueUsed"
import CreateLeague from "./pages/CreateLeague"
import JoinLeague from "./pages/JoinLeague"
import Team from "./pages/Team"
import TeamHome from "./pages/TeamHome"
import TeamUsed from "./pages/TeamUsed"
import TeamPlayerSearch from "./pages/TeamPlayerSearch"

import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as createLeagueAction } from "./pages/CreateLeague"

import { loader as homeLoader } from "./pages/Home"
import { loader as joinLeagueLoader } from "./pages/JoinLeague"

import { store } from "./store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./features/user/userSlice"

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
        path: "/howitworks",
        element: <HowItWorks />,
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
      },
      {
        path: "/leagues/:league_id/rules",
        element: <LeagueRules />,
      },
      {
        path: "/leagues/:league_id/scoreboard",
        element: <LeagueScoreboard />,
      },
      {
        path: "/leagues/:league_id/matchup",
        element: <LeagueMatchup />,
      },
      {
        path: "/leagues/:league_id/used",
        element: <LeagueUsed />,
      },
    ],
  },
  {
    path: "/teams/:team_id",
    element: <Team />,
    children: [
      {
        path: "/teams/:team_id",
        element: <TeamHome />,
      },
      {
        path: "/teams/:team_id/rules",
        element: <TeamUsed />,
      },
      {
        path: "/teams/:team_id/scoreboard",
        element: <TeamPlayerSearch />,
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
  }, [])

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  return <RouterProvider router={router} />
}
