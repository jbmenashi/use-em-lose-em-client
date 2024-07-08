import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"

const Schedule = () => {
  const { schedule, league } = useLoaderData()
  const week = useSelector((state) => state.week)
  const currentLeague = useSelector((state) => state.league)

  let currentWeek

  if (league.sport === "NFL") {
    currentWeek = week.nflWeek
  } else {
    currentWeek = week.mlbWeek
  }

  currentWeek = 7

  const weeksArray = [...Array(league.regular_season_weeks).keys()]
  const newWeeks = weeksArray.map((w) => w + 1)

  for (let i = 1; i <= newWeeks.length; i++) {
    if (i !== currentWeek) {
      newWeeks.push(newWeeks.shift())
    } else {
      break
    }
  }

  console.log(newWeeks)

  return (
    <div className="h-full bg-sky-200 flex flex-col items-center rounded-lg">
      <h1 className="text-center text-2xl font-bold mt-5">Schedule</h1>
      <div className="carousel w-full h-full mt-5">
        {newWeeks.map((item) => {
          return (
            <div key={`slide${item}`} id={`slide${item}`} className="carousel-item relative w-full">
              <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`${currentLeague.leagueId}#slide${item - 1 === 0 ? weeksArray.length - 1 : item - 1}`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`${currentLeague.leagueId}#slide${item + 1 === weeksArray.length ? 1 : item + 1}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          )
        })}
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Schedule
