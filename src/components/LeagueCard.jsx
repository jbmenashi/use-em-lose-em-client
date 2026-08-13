import { Link } from "react-router-dom"
import { getLeagueTeamInfo } from "../features/league/leagueSlice"
import { useDispatch } from "react-redux"
import { getWeeks } from "../features/week/weekSlice"

const LeagueCard = ({ league }) => {
  const dispatch = useDispatch()
  const { leagueId, leagueName, sport, style, teamName, contestantId } = league

  const handleLeagueClick = () => {
    dispatch(getLeagueTeamInfo({ leagueId, leagueName, contestantId, teamName }))
    dispatch(getWeeks())
  }

  return (
    <Link to={`/leagues/${leagueId}`} onClick={handleLeagueClick}>
      <div className="card bg-accent shadow-xl mx-auto my-5 w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <div className="card-body">
          <h2 className="card-title">{leagueName}</h2>
          <p>Sport: {sport}</p>
          <p>Style: {style}</p>
          <p>Team: {teamName ? teamName : "Create your team"}</p>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary text-white" onClick={handleClick}>
          Go to League Page
        </button> */}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default LeagueCard
