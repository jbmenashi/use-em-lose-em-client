import { useLoaderData } from "react-router-dom"

const UnavailableBlock = () => {
  const { contestant } = useLoaderData()
  console.log(contestant)
  let players = ""
  for (let player of contestant.unavailable_players) {
    players = players + player.player_name + ", "
  }

  let teams = ""
  for (let team of contestant.unavailable_teams) {
    teams = teams + team.team_abbreviation + ", "
  }

  // Convert object to an array of key-value pairs
  let sortedTeamCountArray = Object.entries(contestant.team_count).sort((a, b) => b[1] - a[1])

  // Convert sorted array back into an object
  let sortedTeamCount = Object.fromEntries(sortedTeamCountArray)

  let teamCount = ""
  for (let [key, value] of Object.entries(sortedTeamCount)) {
    teamCount = teamCount + `${key}: ${value}, `
  }

  console.log(teamCount)
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
