const ScheduleMatchup = (matchup) => {
  console.log(matchup)
  const {
    team_1_id,
    team_1_name,
    team_1_score,
    team_2_id,
    team_2_name,
    team_2_score,
    winner,
    loser,
    started,
    finished,
  } = matchup
  return (
    <div className="card bg-base-100 shadow-xl my-3 w-5/6">
      <div className="card-body">
        <div className="flex items-center justify-center">
          <div className="grid grid-rows-2 grid-cols-5 w-full max-w-screen-md gap-1">
            <div className="col-span-4 bg-blue-500 text-white p-4">Left Top</div>
            <div className="col-span-1 bg-red-500 text-white p-4">Right Top</div>
            <div className="col-span-4 bg-green-500 text-white p-4">Left Bottom</div>
            <div className="col-span-1 bg-yellow-500 text-white p-4">Right Bottom</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ScheduleMatchup
