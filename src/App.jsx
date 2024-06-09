import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Base from "./pages/Base"
import Home from "./pages/Home"
import HowItWorks from "./pages/HowItWorks"
import Register from "./pages/Register"
import Login from "./pages/Login"

import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as createLeagueAction } from "./pages/CreateLeague"

import { loader as homeLoader } from "./pages/Home"

import { store } from "./store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./features/user/userSlice"
import CreateLeague from "./pages/CreateLeague"
import JoinLeague from "./pages/JoinLeague"

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
        action: createLeagueAction,
      },
      {
        path: "/joinleague",
        element: <JoinLeague />,
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
