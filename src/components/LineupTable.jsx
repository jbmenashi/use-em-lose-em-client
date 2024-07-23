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
            <th className="border border-primary px-2">Position</th>
            <th className="border border-primary px-32 py-2">Player</th>
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
                  <td className="border border-primary px-4 py-2 font-extrabold text-base">{sel.position}</td>
                  <td className="border border-primary px-4 py-2 font-extrabold text-lg">
                    {sel.first_name + " " + sel.last_name}
                    {sel.locked ? (
                      <></>
                    ) : (
                      <button
                        className="btn btn-xs btn-accent ml-2"
                        onClick={() => handleStartSelection(lineup, sel.index, sel.position)}
                      >
                        <Link to={`/leagues/${leagueId}/teams/${teamId}/playersearch?position=${sel.position}`}>
                          Change
                        </Link>
                      </button>
                    )}
                  </td>
                  <td className="border border-primary px-4 py-2 font-extrabold">{sel.team_abbreviation}</td>
                  <td className="border border-primary px-4 py-2 font-extrabold">
                    {sel.total_points ? sel.total_points : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.pass_yds : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.pass_tds : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">{sel.fantasy_stats ? sel.fantasy_stats.ints : 0}</td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.rush_yds : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.receptions : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.rec_yds : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">{sel.fantasy_stats ? sel.fantasy_stats.tds : 0}</td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.fumbles : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.two_pt_conv : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_sacks : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_fum_rec : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_int : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_blk_kicks : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_safeties : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_tds_scored : 0}
                  </td>
                  <td className="border border-primary px-4 py-2">
                    {sel.fantasy_stats ? sel.fantasy_stats.def_pts_allowed : 0}
                  </td>
                </tr>
              )
            }
            return (
              <tr key={sel.index}>
                <td className="border border-primary px-4 py-2 font-extrabold text-base">{sel.position}</td>
                <td className="border border-primary px-4 py-2">
                  <Link
                    to={`/leagues/${leagueId}/teams/${teamId}/playersearch?position=${sel.position}`}
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
