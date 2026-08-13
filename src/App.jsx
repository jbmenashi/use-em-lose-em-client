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
import Loading from "./components/Loading"

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
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useAuth } from "@clerk/clerk-react"
import { getLeagues } from "./features/user/userSlice"
import { getWeeks } from "./features/week/weekSlice"

// Right after a hard refresh, Clerk can report isLoaded=true before
// window.Clerk.session has been swapped from its local placeholder for the
// real, backend-verified session - getToken() during that window can return
// something that isn't actually a verifiable token yet. Wait for a real
// token (or confirmation there's no session at all) before ever mounting the
// router, so no loader can fire a request during that gap.
const waitForAuthReady = async (isSignedIn) => {
  if (!isSignedIn) return
  for (let attempt = 0; attempt < 10; attempt++) {
    const token = await window.Clerk?.session?.getToken()
    if (token) return
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
}

// createBrowserRouter eagerly kicks off the matched route's loader the
// instant it's called - not when <RouterProvider> renders. Building it at
// module scope meant the first loader fired at import time, before Clerk had
// even started initializing, race or no race. Deferring construction until
// authReady is true (see getRouter() below) keeps that eager fetch from ever
// firing before there's a real token to send with it.
let routerInstance = null
function getRouter() {
  if (routerInstance) return routerInstance
  routerInstance = createBrowserRouter([
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
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorElement />,
    },
  ])
  return routerInstance
}

export default function App() {
  const { isLoaded, isSignedIn } = useAuth()
  const dispatch = useDispatch()
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (!isLoaded) return
    let cancelled = false
    waitForAuthReady(isSignedIn).then(() => {
      if (!cancelled) setAuthReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (!authReady) return
    dispatch(getWeeks())
    if (isSignedIn) {
      dispatch(getLeagues())
    }
  }, [authReady, isSignedIn])

  if (!isLoaded || !authReady) {
    return <Loading />
  }
  return <RouterProvider router={getRouter()} />
}
