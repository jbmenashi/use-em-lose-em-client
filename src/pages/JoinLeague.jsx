import { useLoaderData } from "react-router-dom"
import JoinLeagueCard from "../components/JoinLeagueCard"
import { api } from "../api/client"

export const loader = (store) => async () => {
  try {
    const res = await api.get("/leagues/available")
    return res.data
  } catch (error) {
    console.error("[JoinLeague loader] failed to load available leagues", {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      responseData: error?.response?.data,
      message: error?.message,
    })
    throw error
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
            return <JoinLeagueCard key={league._id} league={league} />
          })}
        </div>
      </div>
    </div>
  )
}
export default JoinLeague
