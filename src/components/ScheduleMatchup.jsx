import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ScheduleMatchup = (matchup) => {
  const { teamId } = useSelector((state) => state.league)
  const {
    leagueId,
    team1Id,
    team1Name,
    team1Score,
    team2Id,
    team2Name,
    team2Score,
    winner,
    finished,
    _id,
  } = matchup

  let nameStyling = ""
  let scoreStyling = ""
  let nameStylingTwo = ""
  let scoreStylingTwo = ""

  // if the matchup is over
  if (finished) {
    // if it's the user's team
    if (team1Id === teamId) {
      // if the team won
      if (team1Id === winner) {
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
      if (team1Id === winner) {
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
    if (team1Id === teamId) {
      nameStyling = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4 bg-blue-200"
      scoreStyling = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 bg-blue-200"
      nameStylingTwo = "col-span-4 text-lg sm:text-2xl p-2 sm:p-4"
      scoreStylingTwo = "col-span-1 text-lg sm:text-2xl px-3 sm:px-5 py-2 sm:py-4 "
    } else if (team2Id === teamId) {
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
    <Link className="card bg-base-100 shadow-xl my-3 w-full sm:w-5/6" to={`/leagues/${leagueId}/matchups/${_id}`}>
      <div className="card-body p-2 sm:p-4">
        <div className="flex items-center justify-center">
          <div className="grid grid-rows-2 grid-cols-5 w-full max-w-full sm:max-w-screen-md h-auto sm:h-32">
            {/* Team 1 Name */}
            <div className={nameStyling}>{team1Name}</div>
            {/* Team 1 Score */}
            <div className={scoreStyling}>{team1Score.toFixed(2)}</div>
            {/* Team 2 Name */}
            <div className={nameStylingTwo}>{team2Name}</div>
            {/* Team 2 Score */}
            <div className={scoreStylingTwo}>{team2Score.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ScheduleMatchup
