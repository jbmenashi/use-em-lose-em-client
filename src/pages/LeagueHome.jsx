import Schedule from "../components/Schedule"
import { useLoaderData } from "react-router-dom"
import { api } from "../api/client"
import Standings from "../components/Standings"
import LeagueRules from "../components/LeagueRules"
import { useSelector } from "react-redux"
import { getMatchupIdUser } from "../features/matchup/matchupSlice"

export const loader = (store) => async () => {
  const { leagueId, teamId } = store.getState().league
  const { viewingWeek } = store.getState().week
  try {
    const [scheduleRes, contestantsRes, leagueRes] = await Promise.all([
      api.get(`/leagues/${leagueId}/schedule`),
      api.get(`/contestants/league/${leagueId}`),
      api.get(`/leagues/${leagueId}`),
    ])
    const schedule = Array.isArray(scheduleRes.data) ? scheduleRes.data : null
    const matchup =
      schedule?.find((e) => e.week === viewingWeek && (e.team1Id === teamId || e.team2Id === teamId)) || {}
    const matchupIdUser = matchup._id || null
    store.dispatch(getMatchupIdUser({ matchupIdUser }))
    const standings = contestantsRes.data
    const league = leagueRes.data
    return { schedule, standings, league }
  } catch (error) {
    console.error("[LeagueHome loader] failed to load league data", {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      responseData: error?.response?.data,
      message: error?.message,
      leagueId,
      teamId,
      viewingWeek,
    })
    throw error
  }
}

const LeagueHome = () => {
  const stateLeague = useSelector((state) => state.league)
  const data = useLoaderData()
  const league = data?.league
  const contestants = data?.standings || []

  if (league && league.full === false) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{stateLeague.leagueName}</h1>
        <p className="text-lg sm:text-xl font-semibold mb-2">This league isn&apos;t full yet.</p>
        {league.size && (
          <p className="text-base sm:text-lg mb-6">
            {contestants.length} of {league.size} teams have joined
          </p>
        )}
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2">Teams In League</h2>
          <ul className="space-y-2">
            {contestants.length ? (
              contestants.map((c) => (
                <li key={c._id} className="bg-accent rounded px-4 py-2">
                  {c.teamName || "Team Not Yet Named"}
                </li>
              ))
            ) : (
              <li className="italic">No teams have joined yet</li>
            )}
          </ul>
        </div>
      </div>
    )
  }

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
