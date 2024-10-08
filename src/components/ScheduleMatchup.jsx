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

  let nameStyling = ""
  let scoreStyling = ""
  let nameStylingTwo = ""
  let scoreStylingTwo = ""

  // if the matchup is over
  if (finished) {
    // if it's the user's team
    if (team_1_id === teamId) {
      // if the team won
      if (team_1_id === winner) {
        nameStyling = "col-span-4 text-lg sm:text-2xl font-bold p-2 sm:p-4 bg-blue-200"
        scoreStyling = "col-span-1 text-lg sm:text-2xl font-bold px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
        nameStylingTwo = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
        scoreStylingTwo = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
      }
      // if the team didn't win
      else {
        nameStyling = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 bg-blue-200"
        scoreStyling = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
        nameStylingTwo = "col-span-4 text-lg sm:text-2xl font-bold p-2 sm:p-4 "
        scoreStylingTwo = "col-span-1 text-lg sm:text-2xl font-bold px-3 sm:px-5 py-2 sm:py-4 "
      }
    }
    // if it's not the user's team
    else {
      // if the team won
      if (team_1_id === winner) {
        nameStyling = "col-span-4 text-lg sm:text-2xl font-bold p-2 sm:p-4"
        scoreStyling = "col-span-1 text-lg sm:text-2xl font-bold px-3 sm:px-5 py-2 sm:py-4"
        nameStylingTwo = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
        scoreStylingTwo = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
      }
      // if the team didn't win
      else {
        nameStyling = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
        scoreStyling = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
        nameStylingTwo = "col-span-4 text-lg sm:text-2xl font-bold p-2 sm:p-4"
        scoreStylingTwo = "col-span-1 text-lg sm:text-2xl font-bold px-3 sm:px-5 py-2 sm:py-4"
      }
    }
  }
  // if it's not over
  else {
    // if it's the user's team
    if (team_1_id === teamId) {
      nameStyling = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 bg-blue-200"
      scoreStyling = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
      nameStylingTwo = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
      scoreStylingTwo = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 "
    } else if (team_2_id === teamId) {
      nameStyling = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 "
      scoreStyling = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 "
      nameStylingTwo = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 bg-blue-200"
      scoreStylingTwo = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
    }
    // if it's not the user's team
    else {
      nameStyling = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
      scoreStyling = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
      nameStylingTwo = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
      scoreStylingTwo = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4"
    }
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
            <div className={nameStyling}>{team_1_name}</div>
            {/* Team 1 Score */}
            <div className={scoreStyling}>{team_1_score.toFixed(2)}</div>
            {/* Team 2 Name */}
            <div className={nameStylingTwo}>{team_2_name}</div>
            {/* Team 2 Score */}
            <div className={scoreStylingTwo}>{team_2_score.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ScheduleMatchup
