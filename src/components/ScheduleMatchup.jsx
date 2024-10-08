import { useDispatch, useSelector } from "react-redux"
import { getMatchupId, falseIsUserMatchup } from "../features/matchup/matchupSlice"
import { Link } from "react-router-dom"

const ScheduleMatchup = (matchup) => {
  const { teamId } = useSelector((state) => state.league)
  const {
    league_id,
    team_1_id,
    team_1_name,
    team_1_score,
    team_2_id,
    team_2_name,
    team_2_score,
    winner,
    finished,
    _id,
  } = matchup

  const dispatch = useDispatch()

  const handleMatchup = (matchupId) => {
    dispatch(getMatchupId({ matchupId }))
    dispatch(falseIsUserMatchup())
  }

  return (
    <Link
      className="card bg-base-100 shadow-xl my-3 w-full sm:w-5/6"
      to={`/leagues/${league_id}/matchups/${_id}`}
      onClick={() => handleMatchup(_id)}
    >
      <div className="card-body p-2 sm:p-4">
        <div className="flex items-center justify-center">
          <div className="grid grid-rows-2 grid-cols-5 w-full max-w-full sm:max-w-screen-md h-auto sm:h-32">
            {/* Team 1 Name */}
            <div
              className={
                team_1_id === teamId
                  ? finished && team_1_id === winner
                    ? "col-span-4 text-lg sm:text-2xl font-bold p-2 sm:p-4 bg-blue-200"
                    : "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 bg-blue-200"
                  : "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
              }
            >
              {team_1_name}
            </div>
            {/* Team 1 Score */}
            <div
              className={
                team_1_id === teamId
                  ? finished && team_1_id === winner
                    ? "col-span-1 text-lg sm:text-2xl font-bold px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
                    : "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
                  : "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
              }
            >
              {team_1_score.toFixed(2)}
            </div>
            {/* Team 2 Name */}
            <div
              className={
                team_2_id === teamId
                  ? finished && team_2_id === winner
                    ? "col-span-4 text-lg sm:text-2xl font-bold p-2 sm:p-4 bg-blue-200"
                    : "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 bg-blue-200"
                  : "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
              }
            >
              {team_2_name}
            </div>
            {/* Team 2 Score */}
            <div
              className={
                team_2_id === teamId
                  ? finished && team_2_id === winner
                    ? "col-span-1 text-lg sm:text-2xl font-bold px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
                    : "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
                  : "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
              }
            >
              {team_2_score.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ScheduleMatchup
