import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"

const Standings = () => {
  const { teamId } = useSelector((state) => state.league)
  const { standings } = useLoaderData()

  const newStandings = standings
    .map((s) => {
      return {
        teamId: s._id,
        teamName: s.teamName,
        wins: s.standings.wins || 0,
        losses: s.standings.losses || 0,
        winPct: s.standings.winPct.toFixed(3) || 0,
        pointsFor: s.standings.totalPointsFor.toFixed(2) || 0,
        pointsAgainst: s.standings.totalPointsAg.toFixed(2) || 0,
      }
    })
    .sort((a, b) => {
      if (b.wins === a.wins) {
        return b.pointsFor - a.pointsFor
      }
      return b.wins - a.wins
    })

  return (
    <div className="h-full bg-blue-100 flex flex-col items-center rounded-lg w-full">
      <h1 className="text-center text-2xl font-bold mt-5">Standings</h1>
      <div className="w-full px-2 sm:px-4">
        <div className="max-h-[60vh] w-full overflow-auto p-2 sm:p-4">
          <div className="overflow-x-auto w-full">
            <table className="table-auto border-collapse border border-black text-sm sm:text-lg w-full">
              <thead>
                <tr className="text-sm sm:text-lg">
                  <th className="border border-black px-2 py-1">Rank</th>
                  <th className="border border-black px-2 py-1">Team</th>
                  <th className="border border-black px-2 py-1">W</th>
                  <th className="border border-black px-2 py-1">L</th>
                  <th className="border border-black px-2 py-1">PCT</th>
                  <th className="border border-black px-2 py-1">PF</th>
                  <th className="border border-black px-2 py-1">PA</th>
                </tr>
              </thead>
              <tbody>
                {newStandings.map((item, index) => (
                  <tr key={index} className={`${item.teamId === teamId ? "bg-blue-200 font-bold" : ""}`}>
                    <td className="border border-black px-2 py-1">{index + 1}</td>
                    <td className="border border-black px-2 py-1">{item.teamName}</td>
                    <td className="border border-black px-2 py-1">{item.wins}</td>
                    <td className="border border-black px-2 py-1">{item.losses}</td>
                    <td className="border border-black px-2 py-1">{item.winPct}</td>
                    <td className="border border-black px-2 py-1">{item.pointsFor}</td>
                    <td className="border border-black px-2 py-1">{item.pointsAgainst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Standings
