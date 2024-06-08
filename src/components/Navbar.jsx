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
    <div className="navbar bg-neutral text-neutral-content">
      <Link to="/" className="ml-6 link link-hover">
        <BiHome />
      </Link>
      <Link to="/howitworks" className="ml-10 link link-hover">
        How It Works
      </Link>
      {user ? (
        <div>
          <p>Hello {userName}</p>
          <button className="btn btn-accent" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/register" className="ml-10 link link-hover">
            Register
          </Link>
          <Link to="/login" className="ml-10 link link-hover">
            Login
          </Link>
        </>
      )}
    </div>
  )
}
export default Navbar
