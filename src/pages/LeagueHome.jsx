import Schedule from "../components/Schedule"
import { useLoaderData } from "react-router-dom"
import axios from "axios"
import Standings from "../components/Standings"
import LeagueRules from "../components/LeagueRules"
import { useSelector } from "react-redux"

export const loader = (store) => async () => {
  const { leagueId } = store.getState().league
  try {
    const [scheduleRes, contestantsRes] = await Promise.all([
      axios.get(`http://localhost:8000/league/schedule/${leagueId}`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:8000/contestant/league/${leagueId}`, {
        withCredentials: true,
      }),
    ])
    const schedule = scheduleRes.data
    const standings = contestantsRes.data
    return { schedule, standings }
    // return json({ scheduleRes, standingsRes })
  } catch (error) {
    console.log(error)
    return null
  }
}

const LeagueHome = () => {
  const league = useSelector((state) => state.league)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-4">{league.leagueName}</h1>
      <div className="grid grid-cols-2 gap-4 h-screen">
        <div className="flex flex-col">
          <div className="h-2/3 mb-4">
            <Standings />
          </div>
          <div className="h-1/3">
            <LeagueRules />
          </div>
        </div>
        <div>
          <Schedule />
        </div>
      </div>
    </div>
  )
}
export default LeagueHome
