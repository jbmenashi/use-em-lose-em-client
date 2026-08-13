import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { changeViewingWeek } from "../features/week/weekSlice"
import { api } from "../api/client"
import UnavailableBlock from "../components/UnavailableBlock"
import { useDispatch, useSelector } from "react-redux"
import LineupTable from "../components/LineupTable"
import Loading from "../components/Loading"
import { changePage } from "../features/lineup/lineupSlice"

export const loader = (store) => async () => {
  const { leagueId, teamId } = store.getState().league
  const { viewingWeek } = store.getState().week
  try {
    const [contestantRes, lineupRes, leagueRes] = await Promise.all([
      api.get(`/contestants/${teamId}`),
      api.get(`/lineups/contestant/${teamId}?week=${viewingWeek}`),
      api.get(`/leagues/${leagueId}`),
    ])
    const contestant = contestantRes.data
    const lineup = lineupRes.data
    const league = leagueRes.data
    store.dispatch(changePage({ page: 1 }))
    return { contestant, lineup, league }
  } catch (error) {
    console.error("[TeamHome loader] failed to load team data", {
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

const TeamHome = () => {
  const data = useLoaderData()
  const { lineupLoading } = useSelector((state) => state.lineup)

  if (data === null) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-xl font-semibold">Lineup Will Become Available Once League Is Full</p>
        </div>
      </main>
    )
  }
  const { contestant, lineup, league } = useLoaderData()
  const { viewingWeek } = useSelector((state) => state.week)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleWeekBack = () => {
    dispatch(changeViewingWeek({ newWeek: viewingWeek - 1 }))
    navigate(`${pathname}?week=${viewingWeek - 1}`)
  }

  const handleWeekForward = () => {
    dispatch(changeViewingWeek({ newWeek: viewingWeek + 1 }))
    navigate(`${pathname}?week=${viewingWeek + 1}`)
  }

  // const totalPositions = []
  // for (const [key, value] of Object.entries(league.roster.positions)) {
  //   for (let i = 0; i < value; i++) {
  //     totalPositions.push(key.toUpperCase())
  //   }
  // }

  const totalWeeks = league.regularSeasonWeeks + league.playoffWeeks

  if (lineupLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-center text-2xl sm:text-4xl font-bold my-8">
        {contestant.teamName} - Week {viewingWeek}
      </h1>

      <div className="w-full sm:w-3/4 bg-accent flex overflow-auto p-2 rounded">
        <UnavailableBlock />
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:my-8 my-4">
        {viewingWeek !== 1 && (
          <button
            className="btn bg-primary text-white py-2 px-4 rounded mr-0 sm:mr-4 mb-4 sm:mb-0"
            onClick={handleWeekBack}
          >
            Week {viewingWeek - 1}
          </button>
        )}

        <LineupTable selections={lineup.selections} statistics={league.scoring.statistics} />

        {viewingWeek !== league.regularSeasonWeeks && (
          <button
            className="btn bg-primary text-white py-2 px-4 rounded ml-0 sm:ml-4 mt-4 sm:mt-0"
            onClick={handleWeekForward}
          >
            Week {viewingWeek + 1}
          </button>
        )}
      </div>
    </div>
  )
}
export default TeamHome
