import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { changeViewingWeek } from "../features/week/weekSlice"
import axios from "axios"
import UnavailableBlock from "../components/UnavailableBlock"
import Selection from "../components/Selection"
import { useDispatch, useSelector } from "react-redux"

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
      <div className="w-full bg-gray-200 flex items-center justify-center overflow-auto">
        <UnavailableBlock />
      </div>
      <div className="w-full flex justify-center my-8">
        {viewingWeek !== 1 ? (
          <button className="btn bg-blue-500 text-white py-2 px-4 rounded mr-4" onClick={handleWeekBack}>
            Week {viewingWeek - 1}
          </button>
        ) : (
          <></>
        )}

        {/* Table */}
        <div className="flex-grow">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Header 1</th>
                <th className="border border-gray-300 px-4 py-2">Header 2</th>
                <th className="border border-gray-300 px-4 py-2">Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Data 1</td>
                <td className="border border-gray-300 px-4 py-2">Data 2</td>
                <td className="border border-gray-300 px-4 py-2">Data 3</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Data 4</td>
                <td className="border border-gray-300 px-4 py-2">Data 5</td>
                <td className="border border-gray-300 px-4 py-2">Data 6</td>
              </tr>
            </tbody>
          </table>
        </div>
        {viewingWeek !== league.regular_season_weeks ? (
          <button className="btn bg-blue-500 text-white py-2 px-4 rounded mr-4" onClick={handleWeekForward}>
            Week {viewingWeek + 1}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>

    // <div>
    //   <h1 className="text-2xl">{contestant.team_name}</h1>
    //   <UnavailableBlock />
    //   <button>Previous Week</button>
    //   <button>Next Week</button>
    //   {lineup.selections.map((sel, index) => {
    //     return <Selection key={lineup["_id"]["$oid"] + index} {...sel} />
    //   })}
    // </div>
  )
  // TEAM NAME
  // UNAVAILABLE BLOCK
  // MAP SELECTIONS BY LEAGUE POSITIONS
  // LEFT AND RIGHT WEEK BUTTONS
}
export default TeamHome
