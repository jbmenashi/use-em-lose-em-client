import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Base from "./pages/Base"
import Home from "./pages/Home"
import HowItWorks from "./pages/HowItWorks"
import Register from "./pages/Register"
import Login from "./pages/Login"

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
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
