import { Link, Navigate } from "react-router-dom"
import { getLeagueTeamInfo } from "../features/league/leagueSlice"
import { useDispatch } from "react-redux"

const LeagueCard = ({ league }) => {
  const dispatch = useDispatch()
  const { league_id, league_name, sport, style, team_name, contestant_id } = league
  //   console.log(league_id.$oid)

  const handleLeagueClick = () => {
    console.log("clicked")
    dispatch(getLeagueTeamInfo({ league_id, league_name, contestant_id, team_name }))
  }

  return (
    <Link to={`/leagues/${league_id}`} onClick={handleLeagueClick}>
      <div className="card w-96 bg-accent shadow-xl m-5">
        <div className="card-body">
          <h2 className="card-title">{league_name}</h2>
          <p>Sport: {sport}</p>
          <p>Style: {style}</p>
          <p>Team: {team_name ? team_name : "Create your team"}</p>
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
