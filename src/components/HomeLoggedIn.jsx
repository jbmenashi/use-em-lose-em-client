import { useSelector } from "react-redux"
import LeagueCard from "./LeagueCard"

const HomeLoggedIn = () => {
  const { leagues } = useSelector((state) => state.user)

  if (leagues.length === 0) {
    return <h1>You currently aren't in any leagues</h1>
  }

  return (
    <div className="mx-auto px-14">
      <div className="border-b border-base-300 pb-5 text-center">
        <h1 className="text-4xl font-bold mt-5">My Leagues</h1>
      </div>
      <div className="grid grid-cols-3">
        {leagues.map((league) => {
          return <LeagueCard key={league.league_id} league={league} />
        })}
      </div>
    </div>
  )
}
export default HomeLoggedIn
