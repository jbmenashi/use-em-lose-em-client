import { useSelector } from "react-redux"
import LeagueCard from "./LeagueCard"
import { Link } from "react-router-dom"

const HomeLoggedIn = () => {
  const { leagues } = useSelector((state) => state.user)

  if (leagues.length === 0) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-6xl font-semibold mb-8">Your Leagues Will Appear Here</p>
          <div>
            <Link to="/createleague" className="ml-2 text-4xl font-semibold link link-hover link-primary capitalize">
              Create League
            </Link>
            <p className="mt-2 text-3xl font-semibold">Or</p>
            <Link to="/joinleague" className="ml-2 text-4xl font-semibold link link-hover link-primary capitalize">
              Join League
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border-b border-base-300 pb-5 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mt-5">My Leagues</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {leagues.map((league) => (
          <LeagueCard key={league.league_id} league={league} />
        ))}
      </div>
    </div>
  )
}
export default HomeLoggedIn
