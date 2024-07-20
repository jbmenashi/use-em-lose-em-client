import { useLoaderData } from "react-router-dom"

const PlayersTable = () => {
  const { players, contestant } = useLoaderData()
  console.log(players)
  return (
    <div>
      <table className="table w-full border-collapse border border-primary">
        <thead>
          <tr>
            <th className="border border-primary px-20 py-2">Player</th>
            <th className="border border-primary px-4 py-2">Team</th>
            <th className="border border-primary px-4 py-2">Position</th>
            <th className="border border-primary px-4 py-2">Status</th>
            <th className="border border-primary px-4 py-2">Opponent</th>
            <th className="border border-primary px-4 py-2">Projected Pts</th>
            <th className="border border-primary px-4 py-2">Season Games</th>
            <th className="border border-primary px-4 py-2">Season PPG</th>
            <th className="border border-primary px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player["_id"]["$oid"]}>
                <td className="border border-primary px-4 py-2 font-extrabold text-2xl">
                  {player.first_name + " " + player.last_name}
                </td>
                <td className="border border-primary px-4 py-2 text-xl">{player.team_abbreviation}</td>
                <td className="border border-primary px-4 py-2 text-xl">{player.position}</td>
                <td className="border border-primary px-4 py-2 text-xl">{player.status}</td>
                <td className="border border-primary px-4 py-2 text-xl">
                  {player.projection?.location === "AWAY"
                    ? "@ " + player.projection?.opponent
                    : "vs " + player.projection?.opponent}
                </td>
                <td className="border border-primary px-4 py-2 text-xl">
                  {Math.round(player.projection?.stats?.score * 100) / 100}
                </td>
                <td className="border border-primary px-4 py-2 text-xl">
                  {player.season_stats?.stats?.games ? player.season_stats?.stats?.games : 0}
                </td>
                <td className="border border-primary px-4 py-2 text-xl">
                  {player.season_stats?.stats?.games
                    ? Math.round((player.season_stats?.stats?.yahoo_pts / player.season_stats?.stats?.games) * 100) /
                      100
                    : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  <button className="btn btn-secondary">Add Player</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default PlayersTable
