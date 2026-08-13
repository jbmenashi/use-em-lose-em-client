import { useLoaderData } from "react-router-dom"

const UnavailableBlock = () => {
  const { contestant } = useLoaderData()
  let players = ""
  for (let player of contestant.unavailablePlayers) {
    players = players + player.playerName + ", "
  }

  let teams = ""
  for (let team of contestant.unavailableTeams) {
    teams = teams + team.teamAbbreviation + ", "
  }

  // Convert object to an array of key-value pairs
  let sortedTeamCountArray = Object.entries(contestant.teamCount).sort((a, b) => b[1] - a[1])

  // Convert sorted array back into an object
  let sortedTeamCount = Object.fromEntries(sortedTeamCountArray)

  let teamCount = ""
  for (let [key, value] of Object.entries(sortedTeamCount)) {
    teamCount = teamCount + `${key}: ${value}, `
  }
  return (
    <div className="max-h-[5rem] sm:max-h-[7rem] overflow-y-auto">
      <p className="line-clamp-none">
        <span className="font-bold">Current Team Count:</span> {teamCount}
      </p>
      <p className="line-clamp-none">
        <span className="font-bold">Unavailable Teams:</span> {teams}
      </p>
      <p className="line-clamp-none">
        <span className="font-bold">Unavailable Players:</span> {players}
      </p>
    </div>
  )
}
export default UnavailableBlock
