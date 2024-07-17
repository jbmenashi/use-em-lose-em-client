import Schedule from "../components/Schedule"
import { useLoaderData } from "react-router-dom"
import axios from "axios"
import Standings from "../components/Standings"
import LeagueRules from "../components/LeagueRules"
import { useSelector } from "react-redux"

export const loader = (store) => async () => {
  const { leagueId } = store.getState().league
  try {
    const [scheduleRes, contestantsRes, leagueRes] = await Promise.all([
      axios.get(`http://localhost:8000/league/schedule/${leagueId}`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:8000/contestant/league/${leagueId}`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:8000/league/${leagueId}`, {
        withCredentials: true,
      }),
    ])
    const schedule = scheduleRes.data
    const standings = contestantsRes.data
    const league = leagueRes.data
    return { schedule, standings, league }
  } catch (error) {
    console.log(error)
    return null
  }
}

const LeagueHome = () => {
  const stateLeague = useSelector((state) => state.league)
  const data = useLoaderData()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-4">{stateLeague.leagueName}</h1>
      <div className="grid grid-cols-2 gap-4 h-screen">
        <div className="flex flex-col">
          <div className="h-2/3 mb-4">{data?.standings ? <Standings /> : "no standings"}</div>
          <div className="h-1/3">{data?.league ? <LeagueRules /> : "no league rules"}</div>
        </div>
        <div>{data?.schedule ? <Schedule /> : "no schedule yet!"}</div>
      </div>
    </div>
  )
}
export default LeagueHome
