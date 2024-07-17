import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { logoutUser } from "../features/user/userSlice"
import { clearLeagueTeamInfo } from "../features/league/leagueSlice"
import { BiHome } from "react-icons/bi"
import { changeViewingWeek } from "../features/week/weekSlice"

const LeagueNavbar = () => {
  const { userName } = useSelector((state) => state.user)
  const { leagueId, leagueName, teamId, teamName } = useSelector((state) => state.league)
  const week = useSelector((state) => state.week)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/logout", null, {
        withCredentials: true,
      })
      dispatch(logoutUser())
      dispatch(clearLeagueTeamInfo())
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleWeek = () => {
    dispatch(changeViewingWeek({ newWeek: week.nflWeek }))
  }

  return (
    <div className="navbar bg-primary text-white">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Use 'Em, Lose 'Em Fantasy Sports
        </Link>
      </div>
      <div className="navbar-center">
        <div>
          <Link to={`/leagues/${leagueId}`} className="btn btn-ghost">
            <span className="font-extrabold text-lg">League Home</span>
          </Link>
          <Link
            to={`/leagues/${leagueId}/teams/${teamId}?week=${week.nflWeek}`}
            className="btn btn-ghost"
            onClick={handleWeek}
          >
            <span className="font-extrabold text-lg">My Team</span>
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <div className=" font-bold mr-5">
          <h4>Hello {userName}!</h4>
        </div>
        <div>
          <button className="btn btn-accent text-xl" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default LeagueNavbar
