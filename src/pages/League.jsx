import { Outlet } from "react-router-dom"
import LeagueNavbar from "../components/LeagueNavbar"

const League = () => {
  return (
    <>
      <LeagueNavbar />
      <Outlet />
    </>
  )
}
export default League
