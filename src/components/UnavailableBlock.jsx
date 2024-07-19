import { useLoaderData } from "react-router-dom"

const UnavailableBlock = () => {
  const { contestant } = useLoaderData()
  const players = ""
  for (player of contestant.unavailable_players) {
    players.concat(player)
    players.concat(", ")
  }

  const teams = ""
  for (team of contestant.unavailable_teams) {
    teams.concat(team)
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
