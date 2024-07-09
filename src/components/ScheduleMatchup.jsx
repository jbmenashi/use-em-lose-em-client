import { useSelector } from "react-redux"

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

  return (
    <a className="card bg-base-100 shadow-xl my-3 w-5/6" href={`/leagues/${league_id}/matchups/${_id}`}>
      <div className="card-body p-4">
        <div className="flex items-center justify-center">
          <div className="grid grid-rows-2 grid-cols-5 w-full max-w-screen-md h-32">
            <div
              className={
                team_1_id === teamId
                  ? finished && team_1_id === winner
                    ? "col-span-4 text-2xl font-bold p-4 bg-blue-200"
                    : "col-span-4 text-2xl p-4 bg-blue-200"
                  : "col-span-4 text-2xl p-4"
              }
            >
              {team_1_name}
            </div>
            <div
              className={
                team_1_id === teamId
                  ? finished && team_1_id === winner
                    ? "col-span-1 text-2xl font-bold px-5 py-4 bg-blue-200"
                    : "col-span-1 text-2xl px-5 py-4 bg-blue-200"
                  : "col-span-1 text-2xl px-5 py-4"
              }
            >
              {team_1_score}
            </div>
            <div
              className={
                team_2_id === teamId
                  ? finished && team_2_id === winner
                    ? "col-span-4 text-2xl font-bold p-4 bg-blue-200"
                    : "col-span-4 text-2xl p-4 bg-blue-200"
                  : "col-span-4 text-2xl p-4"
              }
            >
              {team_2_name}
            </div>
            <div
              className={
                team_2_id === teamId
                  ? finished && team_2_id === winner
                    ? "col-span-1 text-2xl font-bold px-5 py-4 bg-blue-200"
                    : "col-span-1 text-2xl px-5 py-4 bg-blue-200"
                  : "col-span-1 text-2xl px-5 py-4"
              }
            >
              {team_2_score}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
export default ScheduleMatchup
