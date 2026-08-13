import { useDispatch, useSelector } from "react-redux"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { getLineup } from "../features/lineup/lineupSlice"
import { lineupLoadingTrue } from "../features/lineup/lineupSlice"

const LineupTable = ({ selections, statistics }) => {
  const { lineup } = useLoaderData()
  const { leagueId, teamId } = useSelector((state) => state.league)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleStartSelection = (lineup, selectionIndex, position) => {
    dispatch(getLineup({ lineup, selectionIndex, position }))
    dispatch(lineupLoadingTrue())
    try {
      navigate(`/leagues/${leagueId}/teams/${teamId}/playersearch?position=${position.toUpperCase()}`)
    } catch (error) {
      console.log(error)
    }
  }
  //   console.log(selections, statistics)
  const statColumns = []
  for (const [key, value] of Object.entries(statistics)) {
    if (key === "passYds") {
      statColumns.push("PassY")
    }
    if (key === "passTds") {
      statColumns.push("PassTD")
    }
    if (key === "ints") {
      statColumns.push("PassInt")
    }
    if (key === "rushYds") {
      statColumns.push("RushY")
    }
    if (key === "receptions") {
      statColumns.push("Rec")
    }
    if (key === "recYds") {
      statColumns.push("RecY")
    }
    if (key === "fumbles") {
      statColumns.push("Fum")
    }
    if (key === "tds") {
      statColumns.push("TD")
    }
    if (key === "twoPtConv") {
      statColumns.push("2PT")
    }
    if (key === "defPtsAllowed") {
      statColumns.push("PtsA")
    }
    if (key === "defSacks") {
      statColumns.push("Sack")
    }
    if (key === "defInts") {
      statColumns.push("Int")
    }
    if (key === "defFumbleRec") {
      statColumns.push("FumRec")
    }
    if (key === "defBlkKicks") {
      statColumns.push("Blk")
    }
    if (key === "defSafeties") {
      statColumns.push("Saf")
    }
    if (key === "defTdsScored") {
      statColumns.push("DefTD")
    }
  }

  return (
    <div className="flex-grow overflow-auto w-full">
      {/* Table is responsive and scrollable on small screens */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-primary">
          <thead>
            <tr>
              <th className="border border-primary px-2 py-1 text-sm sm:text-base" style={{ width: "10%" }}>
                Position
              </th>
              <th className="border border-primary px-20 py-1 text-sm sm:text-base md:px-24" style={{ width: "40%" }}>
                Player
              </th>
              <th className="border border-primary px-2 py-1 text-sm sm:text-base" style={{ width: "10%" }}>
                Team
              </th>
              <th className="border border-primary px-6 py-1 text-sm sm:text-base" style={{ width: "10%" }}>
                Opp
              </th>
              <th
                className="border border-primary px-6 py-1 text-sm sm:text-base whitespace-nowrap"
                style={{ width: "10%" }}
              >
                When
              </th>
              <th className="border border-primary px-2 py-1 text-sm sm:text-base" style={{ width: "10%" }}>
                Score
              </th>
              {statColumns.map((col) => (
                <th key={col} className="border border-primary px-2 py-1 text-sm sm:text-base" style={{ width: "5%" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selections.map((sel) => (
              <tr key={sel.index}>
                <td className="border border-primary px-2 py-1 font-extrabold text-sm sm:text-base">
                  {sel.position.toUpperCase()}
                </td>
                <td className="border border-primary px-2 py-1 font-extrabold text-sm sm:text-lg w-[250%]">
                  {sel.playerName || (
                    <Link
                      to={`/leagues/${leagueId}/teams/${teamId}/playersearch?position=${sel.position.toUpperCase()}`}
                      onClick={() => handleStartSelection(lineup, sel.index, sel.position.toUpperCase())}
                    >
                      <span className="text-primary underline">Select Player</span>
                    </Link>
                  )}
                  {!sel.locked && sel.playerName && (
                    <button
                      className="btn btn-xs btn-accent ml-2"
                      onClick={() => handleStartSelection(lineup, sel.index, sel.position.toUpperCase())}
                    >
                      Change
                    </button>
                  )}
                </td>
                <td className="border border-primary px-2 py-1 text-sm sm:text-base">{sel.teamAbbreviation}</td>
                <td className="border border-primary px-2 py-1 text-sm sm:text-base">
                  {sel.location ? (sel.location === "Away" ? `@ ${sel.opponent}` : `vs ${sel.opponent}`) : sel.opponent}
                </td>
                <td className="border border-primary px-2 py-1 text-sm sm:text-base">{sel.gameTime}</td>
                <td className="border border-primary px-2 py-1 text-sm sm:text-base">
                  {sel.totalPoints ? sel.totalPoints.toFixed(2) : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.passYds : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.passTds : 0}
                </td>
                <td className="border border-primary px-4 py-2">{sel.fantasyStats ? sel.fantasyStats.ints : 0}</td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.rushYds : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.receptions : 0}
                </td>
                <td className="border border-primary px-4 py-2">{sel.fantasyStats ? sel.fantasyStats.recYds : 0}</td>
                <td className="border border-primary px-4 py-2">{sel.fantasyStats ? sel.fantasyStats.tds : 0}</td>
                <td className="border border-primary px-4 py-2">{sel.fantasyStats ? sel.fantasyStats.fumbles : 0}</td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.twoPtConv : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.defSacks : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.defFumbleRec : 0}
                </td>
                <td className="border border-primary px-4 py-2">{sel.fantasyStats ? sel.fantasyStats.defInts : 0}</td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.defBlkKicks : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.defSafeties : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.defTdsScored : 0}
                </td>
                <td className="border border-primary px-4 py-2">
                  {sel.fantasyStats ? sel.fantasyStats.defPtsAllowed : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default LineupTable
