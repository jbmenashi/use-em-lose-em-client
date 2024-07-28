import { useDispatch } from "react-redux"
import { Link, useRouteError } from "react-router-dom"
import { logoutUser } from "../features/user/userSlice"
import { clearLeagueTeamInfo } from "../features/league/leagueSlice"
import axios from "axios"

const ErrorElement = () => {
  const error = useRouteError()
  console.log(error)

  const dispatch = useDispatch()

  const handleReset = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/logout", null, {
        withCredentials: true,
      })
      dispatch(logoutUser())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <div className="text-center">
        <p className="text-9xl font-semibold text-primary">Whoops</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">There's an Error</h1>
        <div className="mt-10 ">
          <Link to="/" className="btn btn-secondary" onClick={handleReset}>
            Go to Home Screen
          </Link>
        </div>
      </div>
    </main>
  )
}
export default ErrorElement
