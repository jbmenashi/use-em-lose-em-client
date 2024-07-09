import { useLoaderData } from "react-router-dom"
import ScheduleMatchup from "./ScheduleMatchup"

const ScheduleMatchupList = ({ week }) => {
  const { schedule } = useLoaderData()

  const weekSchedule = schedule.filter((s) => s.week === week)
  return (
    <div className="max-h-[90vh] w-full overflow-auto p-4">
      <h3 className="flex text-center text-xl font-bold pl-12">Week {week}</h3>
      <div className="flex flex-col items-center justify-center">
        {weekSchedule.map((matchup) => {
          return <ScheduleMatchup key={matchup["_id"]} {...matchup} />
        })}
      </div>
    </div>
  )
}
export default ScheduleMatchupList
