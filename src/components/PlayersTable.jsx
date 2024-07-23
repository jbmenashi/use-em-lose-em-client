import axios from "axios"
import { useSelector } from "react-redux"
import { useLoaderData, useNavigate } from "react-router-dom"

const PlayersTable = () => {
  const { players, contestant } = useLoaderData()
  const { lineup, selectionIndex, position } = useSelector((state) => state.lineup)
  const { leagueId, teamId } = useSelector((state) => state.league)
  const { viewingWeek } = useSelector((state) => state.week)
  const navigate = useNavigate()
  console.log(players)

  const handleAddPlayer = async (player) => {
    let selection = {
      position: position,
      locked: false,
      index: selectionIndex,
      player_id: player.player_id,
      first_name: player.first_name,
      last_name: player.last_name,
      team_id: player.team_id,
      team_abbreviation: player.team_abbreviation,
    }
    try {
      const res = await axios.put(`http://localhost:8000/lineup/${lineup["_id"]["$oid"]}`, selection, {
        withCredentials: true,
      })
      if (res.status === 200) {
        navigate(`/leagues/${leagueId}/teams/${teamId}?week=${viewingWeek}`)
      }
    } catch (error) {
      console.log(error)
    }

    // console.log(lineup)
    // let newSelections = lineup.selections.map((sel, index) => {
    //   if (index === selectionIndex) {
    //     let newSelection = {}
    //     newSelection.position = sel.position
    //     newSelection.locked = sel.locked
    //     newSelection.index = sel.index
    //     newSelection.player_id = player["_id"]["$oid"]
    //     newSelection.first_name = player.first_name
    //     newSelection.last_name = player.last_name
    //     newSelection.team_id = player.team_id
    //     newSelection.team_abbreviation = player.team_abbreviation
    //     return newSelection
    //   } else return sel
    // })
    // let newLineup = { ...lineup, selections: newSelections }
    // console.log(newLineup)
    // newLineup["selections"] = newSelections

    // try {
    //   const res = await axios.put(`http://localhost:8000/lineup/${lineup["_id"]["$oid"]}`, newLineup, {
    //     withCredentials: true,
    //   })
    //   if (res.status === 201) {
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

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
                  <button className="btn btn-secondary" onClick={() => handleAddPlayer(player)}>
                    Add Player
                  </button>
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
