import { useLoaderData } from "react-router-dom"

const UnavailableBlock = () => {
  const { contestant } = useLoaderData()
  let players = ""
  for (let player of contestant.unavailable_players) {
    players = players + player.first_name + " " + player.last_name + ", "
  }

  let teams = ""
  for (let team of contestant.unavailable_teams) {
    teams.concat(team.team_abbreviation)
    teams.concat(", ")
  }

  return (
    <div>
      <p>
        <span className="font-bold">Unavailable Players:</span> {players}
      </p>
      <p>
        <span className="font-bold">Unavailable Teams:</span> {teams}
      </p>
    </div>
  )
}
export default UnavailableBlock
