import { useDispatch } from "react-redux"
import { Link, useRouteError } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { clearLeagueTeamInfo } from "../features/league/leagueSlice"

const ErrorElement = () => {
  const error = useRouteError()
  console.log(error)

  const { signOut } = useAuth()

  const dispatch = useDispatch()

  const handleReset = async () => {
    await signOut()
    dispatch(clearLeagueTeamInfo())
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
