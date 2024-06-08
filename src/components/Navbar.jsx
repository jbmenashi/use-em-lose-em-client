import { BiHome } from "react-icons/bi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { user, userName } = useSelector((state) => state.user)
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
          <button className="btn btn-accent">Logout</button>
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
