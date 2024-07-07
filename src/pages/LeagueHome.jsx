import Schedule from "../components/Schedule"
import { useLoaderData } from "react-router-dom"
import axios from "axios"
import Standings from "../components/Standings"

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
  return (
    <>
      <div>
        <Schedule />
        <Standings />
      </div>
    </>
  )
}
export default LeagueHome
