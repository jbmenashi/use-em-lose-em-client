import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useLoaderData, useNavigate } from "react-router-dom"
import { clearTeamFilter, changePage } from "../features/lineup/lineupSlice"

const PlayersTable = () => {
  const { players } = useLoaderData()
  const { lineup, selectionIndex, position } = useSelector((state) => state.lineup)
  const { leagueId, teamId } = useSelector((state) => state.league)
  const { viewingWeek } = useSelector((state) => state.week)
  const { token } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddPlayer = async (player) => {
    let selection = {
      position: position,
      locked: false,
      index: selectionIndex,
      player_id: player.player_id,
      player_name: player.player_name,
      team_id: player.team_id,
      team_abbreviation: player.team_abbreviation,
    }
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/lineup/${lineup["_id"]["$oid"]}`, selection, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200) {
        dispatch(clearTeamFilter())
        dispatch(changePage({ page: 1 }))
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
    //     newSelection.player_name = player.player_name
    //     newSelection.team_id = player.team_id
    //     newSelection.team_abbreviation = player.team_abbreviation
    //     return newSelection
    //   } else return sel
    // })
    // let newLineup = { ...lineup, selections: newSelections }
    // console.log(newLineup)
    // newLineup["selections"] = newSelections
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-primary">
        <thead>
          <tr>
            <th className="border border-primary px-16 sm:px-16 py-2 text-sm sm:text-base">Player</th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Team</th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Position</th>
            <th className="border border-primary px-2 sm:px-4 py-2"></th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Status</th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Opponent</th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Projected Pts</th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Season Games</th>
            <th className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-base">Season PPG</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player["_id"]["$oid"]}>
                <td className="border border-primary px-2 sm:px-4 py-2 font-extrabold text-lg sm:text-2xl">
                  {player.player_name}
                </td>

                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">
                  {player.team_abbreviation}
                </td>
                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">{player.position}</td>
                <td className="border border-primary px-2 sm:px-4 py-2">
                  <button className="btn btn-secondary text-xs sm:text-sm" onClick={() => handleAddPlayer(player)}>
                    Add Player
                  </button>
                </td>
                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">{player.status}</td>
                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">
                  {player.projection?.location
                    ? player.projection?.location === "AWAY"
                      ? "@ " + player.projection?.opponent
                      : "vs " + player.projection?.opponent
                    : "No Opponent"}
                </td>
                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">
                  {player.projection?.stats?.score ? Math.round(player.projection?.stats?.score * 100) / 100 : 0.0}
                </td>
                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">
                  {player.season_stats?.stats?.games ? player.season_stats?.stats?.games : 0}
                </td>
                <td className="border border-primary px-2 sm:px-4 py-2 text-sm sm:text-xl">
                  {player.season_stats?.stats?.games
                    ? Math.round((player.season_stats?.stats?.yahoo_pts / player.season_stats?.stats?.games) * 100) /
                      100
                    : 0}
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
