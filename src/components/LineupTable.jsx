import { useDispatch, useSelector } from "react-redux"
import { Link, useLoaderData } from "react-router-dom"
import { getLineup } from "../features/lineup/lineupSlice"

const LineupTable = ({ selections, statistics }) => {
  const { lineup } = useLoaderData()
  const { leagueId, teamId } = useSelector((state) => state.league)
  const dispatch = useDispatch()

  const handleStartSelection = (lineup, selectionIndex, position) => {
    dispatch(getLineup({ lineup, selectionIndex, position }))
  }
  //   console.log(selections, statistics)
  const statColumns = []
  for (const [key, value] of Object.entries(statistics)) {
    if (key === "pass_yds") {
      statColumns.push("PassY")
    }
    if (key === "pass_tds") {
      statColumns.push("PassTD")
    }
    if (key === "ints") {
      statColumns.push("PassInt")
    }
    if (key === "rush_yds") {
      statColumns.push("RushY")
    }
    if (key === "receptions") {
      statColumns.push("Rec")
    }
    if (key === "rec_yds") {
      statColumns.push("RecY")
    }
    if (key === "fumbles") {
      statColumns.push("Fum")
    }
    if (key === "tds") {
      statColumns.push("TD")
    }
    if (key === "two_pt_conv") {
      statColumns.push("2PT")
    }
    if (key === "def_pts_allowed") {
      statColumns.push("PtsA")
    }
    if (key === "def_sacks") {
      statColumns.push("Sack")
    }
    if (key === "def_ints") {
      statColumns.push("Int")
    }
    if (key === "def_fumble_rec") {
      statColumns.push("FumRec")
    }
    if (key === "def_blk_kicks") {
      statColumns.push("Blk")
    }
    if (key === "def_safeties") {
      statColumns.push("Saf")
    }
    if (key === "def_tds_scored") {
      statColumns.push("DefTD")
    }
  }

  return (
    <div className="flex-grow overflow-auto">
      <table className="table w-full border-collapse border border-primary">
        <thead>
          <tr>
            <th className="border border-primary px-1"></th>
            <th className="border border-primary px-20 py-2">Player</th>
            <th className="border border-primary px-4 py-2">Team</th>
            <th className="border border-primary px-4 py-2">Score</th>
            {statColumns.map((col) => {
              return (
                <th key={col} className="border border-primary px-4 py-2">
                  {col}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {selections.map((sel) => {
            if ("player_id" in sel) {
              return (
                <tr key={sel.index}>
                  <td className="border border-primary px-4 py-2 font-extrabold">{sel.position}</td>
                  <td className="border border-primary px-4 py-2 font-extrabold">
                    {sel.first_name + " " + sel.last_name}
                  </td>
                </tr>
              )
            }
            return (
              <tr key={sel.index}>
                <td className="border border-primary px-4 py-2 font-extrabold">{sel.position}</td>
                <td className="border border-primary px-4 py-2">
                  <Link
                    to={`/leagues/${leagueId}/teams/${teamId}/playersearch?position=${sel.position}`}
                    className="btn btn-ghost"
                    onClick={() => handleStartSelection(lineup, sel.index, sel.position)}
                  >
                    <span className="text-lg text-primary underline">Select Player</span>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default LineupTable
