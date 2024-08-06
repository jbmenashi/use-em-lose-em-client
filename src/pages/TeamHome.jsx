import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { changeViewingWeek } from "../features/week/weekSlice"
import axios from "axios"
import UnavailableBlock from "../components/UnavailableBlock"
import { useDispatch, useSelector } from "react-redux"
import LineupTable from "../components/LineupTable"

export const loader = (store) => async () => {
  const { leagueId, teamId } = store.getState().league
  const { viewingWeek } = store.getState().week
  try {
    const [contestantRes, lineupRes, leagueRes] = await Promise.all([
      axios.get(`http://localhost:8000/contestant/${teamId}`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:8000/lineup/contestant/${teamId}?week=${viewingWeek}`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:8000/league/${leagueId}`, {
        withCredentials: true,
      }),
    ])
    const contestant = contestantRes.data
    const lineup = lineupRes.data
    const league = leagueRes.data
    return { contestant, lineup, league }
  } catch (error) {
    console.log(error)
    return null
  }
}

const TeamHome = () => {
  const data = useLoaderData()

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

  const totalWeeks = league.regular_season_weeks + league.playoff_weeks

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">
        {contestant.team_name} - Week {viewingWeek}
      </h1>
      <div className="w-3/4 bg-accent flex overflow-auto p-2 rounded">
        <UnavailableBlock />
      </div>
      <div className="w-full flex justify-center my-8">
        {viewingWeek !== 1 ? (
          <button className="btn bg-primary text-white py-2 px-4 rounded mr-4" onClick={handleWeekBack}>
            Week {viewingWeek - 1}
          </button>
        ) : (
          <></>
        )}
        <LineupTable selections={lineup.selections} statistics={league.scoring.statistics} />
        {viewingWeek !== league.regular_season_weeks ? (
          <button className="btn bg-primary text-white py-2 px-4 rounded mr-4" onClick={handleWeekForward}>
            Week {viewingWeek + 1}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
export default TeamHome
