import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"

const Standings = () => {
  const { teamId } = useSelector((state) => state.league)
  const { standings } = useLoaderData()

  const newStandings = standings
    .map((s) => {
      return {
        teamId: s["_id"]["$oid"],
        teamName: s.team_name,
        wins: s.standings.wins || 0,
        losses: s.standings.losses || 0,
        winPct: s.standings.win_pct || 0,
        pointsFor: s.standings.total_points_for || 0,
        pointsAgainst: s.standings.total_points_ag || 0,
      }
    })
    .sort((a, b) => {
      if (b.wins === a.wins) {
        return b.pointsFor - a.pointsFor
      }
      return b.wins - a.wins
    })

  return (
    <div className="h-full bg-blue-100 flex flex-col items-center rounded-lg">
      <h1 className="text-center text-2xl font-bold mt-5">Standings</h1>
      <div className="w-full px-4">
        <div className="max-h-[60vh] max-w-full overflow-auto p-4">
          <table className="table border-black">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>W</th>
                <th>L</th>
                <th>PCT</th>
                <th>PF</th>
                <th>PA</th>
              </tr>
            </thead>
            <tbody>
              {newStandings.map((item, index) => {
                return (
                  <tr key={index} className={item.teamId === teamId ? "bg-blue-200 font-bold" : ""}>
                    <td>{index + 1}</td>
                    <td>{item.teamName}</td>
                    <td>{item.wins}</td>
                    <td>{item.losses}</td>
                    <td>{item.winPct}</td>
                    <td>{item.pointsFor}</td>
                    <td>{item.pointsAgainst}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Standings
