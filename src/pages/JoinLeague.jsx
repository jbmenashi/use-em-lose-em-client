import axios from "axios"
import { useLoaderData } from "react-router-dom"
import JoinLeagueCard from "../components/JoinLeagueCard"

export const loader = (store) => async () => {
  const { user, userId, token } = store.getState().user
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/league/available/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const JoinLeague = () => {
  const leagues = useLoaderData()

  return (
    <div>
      <div className="mx-auto px-14">
        <div className="border-b border-base-300 pb-5 text-center">
          <h1 className="text-4xl font-bold mt-5">Join A League</h1>
        </div>
        <div className="grid grid-cols-3">
          {leagues.map((league) => {
            return <JoinLeagueCard key={league["_id"]["$oid"]} league={league} />
          })}
        </div>
      </div>
    </div>
  )
}
export default JoinLeague
