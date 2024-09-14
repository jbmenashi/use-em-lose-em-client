import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { logoutUser } from "../features/user/userSlice"
import { clearLeagueTeamInfo } from "../features/league/leagueSlice"
import { BiHome } from "react-icons/bi"
import { changeViewingWeek } from "../features/week/weekSlice"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

const LeagueNavbar = () => {
  const { userName, token } = useSelector((state) => state.user)
  const { leagueId, leagueName, teamId, teamName } = useSelector((state) => state.league)
  const week = useSelector((state) => state.week)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="navbar bg-primary text-white px-4">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-lg md:text-xl">
          Use 'Em, Lose 'Em Fantasy Sports
        </Link>
      </div>

      {/* Hamburger Icon for Mobile Screens */}
      <div className="navbar-end md:hidden">
        <button className="text-2xl focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="navbar-center hidden md:flex space-x-4">
        <div>
          <Link to={`/leagues/${leagueId}`} className="btn btn-ghost">
            <span className="font-extrabold text-lg">League Home</span>
          </Link>
          <Link
            to={`/leagues/${leagueId}/teams/${teamId}?week=${week.nflWeek}`}
            className="btn btn-ghost"
            onClick={handleWeek}
          >
            <span className="font-extrabold text-lg">Set Lineup</span>
          </Link>
        </div>
      </div>

      <div className="navbar-end hidden md:flex items-center space-x-4">
        <div className=" font-bold mr-5">
          <h4>Hello {userName}!</h4>
        </div>
        <div>
          <button className="btn btn-accent text-xl" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 bg-primary w-full h-auto shadow-lg text-center py-4 md:hidden z-50">
          <div className="flex flex-row space-x-4 justify-center items-center flex-wrap">
            <Link to={`/leagues/${leagueId}`} className="btn btn-ghost">
              <span className="font-extrabold text-lg md:text-xl">League Home</span>
            </Link>
            <Link
              to={`/leagues/${leagueId}/teams/${teamId}?week=${week.nflWeek}`}
              className="btn btn-ghost"
              onClick={handleWeek}
            >
              <span className="font-extrabold text-lg md:text-xl">Set Lineup</span>
            </Link>
            <button className="btn btn-accent text-lg md:text-xl" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default LeagueNavbar
