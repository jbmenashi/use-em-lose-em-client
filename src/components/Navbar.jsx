import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useAuth, useUser } from "@clerk/clerk-react"
import { clearLeagueTeamInfo } from "../features/league/leagueSlice"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const { isSignedIn, user } = useUser()
  const { signOut } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await signOut()
    dispatch(clearLeagueTeamInfo())
    navigate("/")
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="navbar bg-primary text-white px-4">
      {/* Navbar Start (Logo or Branding) */}
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

      {/* Navbar Center (Links for medium and larger screens) */}
      <div className="navbar-center hidden md:flex space-x-4">
        {isSignedIn && (
          <>
            <Link to="/createleague" className="btn btn-ghost">
              <span className="font-extrabold text-lg">Create League</span>
            </Link>
            <Link to="/joinleague" className="btn btn-ghost">
              <span className="font-extrabold text-lg">Join League</span>
            </Link>
          </>
        )}
      </div>

      {/* Navbar End (Login/Register/Logout links for medium and larger screens) */}
      <div className="navbar-end hidden md:flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <div className=" font-bold mr-5">
              <h4>Hello {user?.primaryEmailAddress?.emailAddress}!</h4>
            </div>
            <button className="btn btn-accent text-xl" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn-ghost text-xl">
              Register
            </Link>
            <Link to="/login" className="btn btn-ghost text-xl">
              Login
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 bg-primary w-full h-auto shadow-lg text-center py-4 md:hidden z-50">
          <div className="flex flex-row space-x-4 justify-center items-center flex-wrap">
            {isSignedIn ? (
              <>
                <Link to="/createleague" className="btn btn-ghost" onClick={toggleMobileMenu}>
                  <span className="font-extrabold text-lg md:text-xl">Create League</span>
                </Link>
                <Link to="/joinleague" className="btn btn-ghost" onClick={toggleMobileMenu}>
                  <span className="font-extrabold text-lg md:text-xl">Join League</span>
                </Link>
                <button className="btn btn-accent text-lg md:text-xl" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-ghost text-lg md:text-xl" onClick={toggleMobileMenu}>
                  Register
                </Link>
                <Link to="/login" className="btn btn-ghost text-lg md:text-xl" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Navbar
