import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { logoutUser } from "../features/user/userSlice"
import { clearLeagueTeamInfo } from "../features/league/leagueSlice"
import { BiHome } from "react-icons/bi"

const LeagueNavbar = () => {
  const { userName } = useSelector((state) => state.user)
  const { leagueId, leagueName, teamId, teamName } = useSelector((state) => state.league)
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
            <span className="font-extrabold">League Home</span>
          </Link>
          <Link to={`/leagues/${leagueId}/teams/${teamId}`} className="btn btn-ghost">
            <span className="font-extrabold">My Team</span>
          </Link>
          <Link to={`/leagues/${leagueId}/used`} className="btn btn-ghost">
            <span className="font-extrabold">Used Players/Teams</span>
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
