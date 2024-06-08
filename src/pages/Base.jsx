import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Base = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
export default Base
