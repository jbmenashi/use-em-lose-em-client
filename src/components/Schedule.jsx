import { useState } from "react"
import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import ScheduleMatchupList from "./ScheduleMatchupList"

const Schedule = () => {
  const { league } = useLoaderData()
  const week = useSelector((state) => state.week)

  let currentWeek

  if (league.sport === "NFL") {
    currentWeek = week.nflWeek
  } else {
    currentWeek = week.mlbWeek
  }

  const weeksArray = [...Array(league.regularSeasonWeeks + league.playoffWeeks).keys()]
  const newWeeks = weeksArray.map((w) => w + 1)

  for (let i = 1; i <= newWeeks.length; i++) {
    if (i !== currentWeek) {
      newWeeks.push(newWeeks.shift())
    } else {
      break
    }
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const activeWeek = newWeeks[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? newWeeks.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === newWeeks.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="h-full bg-sky-200 flex flex-col items-center rounded-lg">
      <h1 className="text-center text-2xl font-bold mt-5">Schedule</h1>
      <div className="relative w-full h-full">
        <ScheduleMatchupList week={activeWeek} />
        <div className="hidden sm:flex absolute left-5 right-5 top-1/2 -translate-y-1/2 transform justify-between">
          <button type="button" onClick={handlePrev} className="btn btn-square btn-outline btn-sm">
            ❮
          </button>
          <button type="button" onClick={handleNext} className="btn btn-square btn-outline btn-sm">
            ❯
          </button>
        </div>
      </div>
    </div>
  )
}
export default Schedule
