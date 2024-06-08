import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Base from "./pages/Base"
import Home from "./pages/Home"
import HowItWorks from "./pages/HowItWorks"
import Register from "./pages/Register"
import Login from "./pages/Login"

import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"

import { store } from "./store"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/howitworks",
        element: <HowItWorks />,
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
  return <RouterProvider router={router} />
}
