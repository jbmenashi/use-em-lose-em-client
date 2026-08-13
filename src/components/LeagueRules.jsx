import { useLoaderData } from "react-router-dom"

const LeagueRules = () => {
  const { league } = useLoaderData()

  let rosterString = ""
  for (const [key, value] of Object.entries(league.roster.positions)) {
    rosterString += `${key.toUpperCase()}: ${value}; `
  }

  return (
    <div className="h-full bg-slate-300 flex flex-col items-center rounded-lg">
      <h1 className="text-center text-2xl font-bold mt-5 w-full">League Rules</h1>
      <div className="flex w-full px-4 justify-center">
        <div className="w-1/2 p-4">
          <p className="mb-1">
            <span className="font-bold">Sport:</span> {league.sport}
          </p>
          <p className="mb-1">
            <span className="font-bold">Season:</span> {league.season}
          </p>
          <p className="mb-1">
            <span className="font-bold">Style:</span> {league.style}
          </p>
          <p className="mb-1">
            <span className="font-bold">Schedule:</span> Regular Season: {league.regularSeasonWeeks} weeks | Playoffs:{" "}
            {league.playoffWeeks} weeks
          </p>
        </div>
        <div className="w-1/2 p-4">
          <p className="mb-1">
            <span className="font-bold">Playoff Teams:</span> {league.playoffTeams}
          </p>
          <p className="mb-1">
            <span className="font-bold">Times Each Team Can Be Used:</span> {league.teamCount}
          </p>
          <p className="mb-1">
            <span className="font-bold">Rosters:</span> {rosterString}
          </p>
          <p className="mb-1">
            <span className="font-bold">Scoring:</span> Traditional Yahoo
          </p>
        </div>
      </div>
    </div>
  )
}
export default LeagueRules
