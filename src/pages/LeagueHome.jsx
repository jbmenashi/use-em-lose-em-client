import Schedule from "../components/Schedule"
import { useLoaderData } from "react-router-dom"
import axios from "axios"
import Standings from "../components/Standings"
import LeagueRules from "../components/LeagueRules"
import { useSelector } from "react-redux"

export const loader = (store) => async () => {
  const { leagueId } = store.getState().league
  const { token } = store.getState().user
  try {
    const [scheduleRes, contestantsRes, leagueRes] = await Promise.all([
      axios.get(`https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/league/schedule/${leagueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/contestant/league/${leagueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/league/${leagueId}`, {
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
        <div>
          {data?.schedule ? (
            <Schedule />
          ) : (
            <main className="grid min-h-[100vh] place-items-center px-8">
              <div className="text-center">
                <p className="text-xl font-semibold">Schedule Will Become Available Once League Is Full</p>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  )
}
export default LeagueHome
