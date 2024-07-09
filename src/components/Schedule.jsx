import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import ScheduleMatchupList from "./ScheduleMatchupList"

const Schedule = () => {
  const { league } = useLoaderData()
  const week = useSelector((state) => state.week)
  const currentLeague = useSelector((state) => state.league)

  let currentWeek

  if (league.sport === "NFL") {
    currentWeek = week.nflWeek
  } else {
    currentWeek = week.mlbWeek
  }

  const weeksArray = [...Array(league.regular_season_weeks).keys()]
  const newWeeks = weeksArray.map((w) => w + 1)

  for (let i = 1; i <= newWeeks.length; i++) {
    if (i !== currentWeek) {
      newWeeks.push(newWeeks.shift())
    } else {
      break
    }
  }

  return (
    <div className="h-full bg-sky-200 flex flex-col items-center rounded-lg">
      <h1 className="text-center text-2xl font-bold mt-5">Schedule</h1>
      <div className="carousel w-full h-full">
        {newWeeks.map((item) => {
          return (
            <section key={`slide${item}`} id={`slide${item}`} className="carousel-item relative w-full">
              <ScheduleMatchupList week={item} />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`${currentLeague.leagueId}#slide${item - 1 === 0 ? newWeeks.length : item - 1}`}
                  className="btn btn-circle scroll-pt-3.5"
                >
                  ❮
                </a>
                <a
                  href={`${currentLeague.leagueId}#slide${item === newWeeks.length ? 1 : item + 1}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
export default Schedule
