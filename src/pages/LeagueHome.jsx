import { useSelector } from "react-redux"

const LeagueHome = () => {
  const { leagueId, leagueName, teamId, teamName } = useSelector((state) => state.league)
  return <div>{teamName}</div>
}
export default LeagueHome
