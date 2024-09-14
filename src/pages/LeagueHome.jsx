import Schedule from "../components/Schedule"
import { useLoaderData, redirect } from "react-router-dom"
import axios from "axios"
import Standings from "../components/Standings"
import LeagueRules from "../components/LeagueRules"
import { useSelector } from "react-redux"
import { logoutUser } from "../features/user/userSlice"

export const loader = (store) => async () => {
  const { leagueId } = store.getState().league
  const { token } = store.getState().user
  try {
    const [scheduleRes, contestantsRes, leagueRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/league/schedule/${leagueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/contestant/league/${leagueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/league/${leagueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
    const schedule = scheduleRes.data
    const standings = contestantsRes.data
    const league = leagueRes.data
    return { schedule, standings, league }
  } catch (error) {
    console.log(error)
    store.dispatch(logoutUser())
    return redirect("/")
  }
}

const LeagueHome = () => {
  const stateLeague = useSelector((state) => state.league)
  const data = useLoaderData()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-4">{stateLeague.leagueName}</h1>
      <div>
        {/* Layout for Medium and Large Screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-screen">
          <div className="flex flex-col">
            <div className="h-full md:h-2/3 mb-4 w-full">{data?.standings ? <Standings /> : "no standings"}</div>
            <div className="h-48 md:h-1/3">{data?.league ? <LeagueRules /> : "no league rules"}</div>
          </div>
          <div>
            {data?.schedule ? (
              <Schedule />
            ) : (
              <main className="grid min-h-[50vh] md:min-h-[100vh] place-items-center px-8">
                <div className="text-center">
                  <p className="text-base sm:text-lg md:text-xl font-semibold">
                    Schedule Will Become Available Once League Is Full
                  </p>
                </div>
              </main>
            )}
          </div>
        </div>

        {/* Layout for Small Screens */}
        <div className="block md:hidden">
          <div className="mb-4">{data?.standings ? <Standings /> : "no standings"}</div>
          <div className="mb-4">
            {data?.schedule ? (
              <Schedule />
            ) : (
              <main className="grid min-h-[50vh] place-items-center px-8">
                <div className="text-center">
                  <p className="text-base sm:text-lg font-semibold">
                    Schedule Will Become Available Once League Is Full
                  </p>
                </div>
              </main>
            )}
          </div>
          <div>{data?.league ? <LeagueRules /> : "no league rules"}</div>
        </div>
      </div>
    </div>
  )
}
export default LeagueHome
