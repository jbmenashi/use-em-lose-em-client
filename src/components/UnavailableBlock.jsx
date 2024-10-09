import { useLoaderData } from "react-router-dom"

const UnavailableBlock = () => {
  const { contestant } = useLoaderData()
  let players = ""
  for (let player of contestant.unavailable_players) {
    players = players + player.player_name + ", "
  }

  let teams = ""
  for (let team of contestant.unavailable_teams) {
    teams = teams + team.team_abbreviation + ", "
  }

  return (
    <div className="max-h-[5rem] overflow-y-auto">
      <p className="line-clamp-none">
        <span className="font-bold">Unavailable Players:</span> {players}
      </p>
      <p className="line-clamp-none">
        <span className="font-bold">Unavailable Teams:</span> {teams}
      </p>
    </div>
  )
}
export default UnavailableBlock
