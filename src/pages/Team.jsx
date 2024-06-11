import { Outlet } from "react-router-dom"
import TeamNavbar from "../components/TeamNavbar"

const League = () => {
  return (
    <>
      <TeamNavbar />
      <Outlet />
    </>
  )
}
export default League
