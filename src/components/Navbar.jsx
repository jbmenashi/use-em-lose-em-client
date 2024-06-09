import { BiHome } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { Link, redirect } from "react-router-dom"
import axios from "axios"
import { logoutUser } from "../features/user/userSlice"

const Navbar = () => {
  const { user, userName } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/logout", null, {
        withCredentials: true,
      })
      dispatch(logoutUser())
      redirect("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="navbar bg-primary text-white">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl">Use 'Em, Lose 'Em Fantasy Sports</Link>
      </div>
      <div className="navbar-center">
        {user && (
          <div>
            <Link to="/howitworks" className="btn btn-ghost">
              <span className="font-extrabold">How It Works</span>
            </Link>
            <Link to="/createleague" className="btn btn-ghost">
              <span className="font-extrabold">Create League</span>
            </Link>
            <Link to="/joinleague" className="btn btn-ghost">
              <span className="font-extrabold">Join League</span>
            </Link>
          </div>
        )}
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className=" font-bold mr-2">
              <h4>Hello {userName}!</h4>
            </div>
            <div>
              <button className="btn btn-accent text-xl" onClick={handleLogout}>
                Logout
              </button>
            </div>
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
    </div>
  )
}
export default Navbar
