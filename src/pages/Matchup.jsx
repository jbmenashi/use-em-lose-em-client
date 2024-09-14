import axios from "axios"
import { useSelector } from "react-redux"
import { useLoaderData, redirect } from "react-router-dom"
import { logoutUser } from "../features/user/userSlice"

export const loader = (store) => async () => {
  const { matchupId } = store.getState().matchup
  const { token } = store.getState().user
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matchup/${matchupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
    store.dispatch(logoutUser())
    return redirect("/")
  }
}

const Matchup = () => {
  const matchup = useLoaderData()
  const { leagueName, teamId } = useSelector((state) => state.league)
  return (
    <div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold m-4">
        {leagueName} - Week {matchup.week} {matchup.season_type === "REG" ? "(Regular Season)" : "(Playoffs)"}
      </h1>

      {/* Display for small screens - combined table */}
      <div className="block sm:hidden">
        <div className="bg-sky-200 rounded flex flex-col justify-center items-center py-4 px-1 sm:p-6">
          {/* Flexbox for Team Names and Scores */}
          <div className="flex justify-between w-full px-1 mb-4">
            {/* Team 1 Name and Score */}
            <div className="flex flex-col items-left">
              <h2 className="text-base font-bold">{matchup.team_1_name}</h2>
              <h1 className="text-4xl font-bold">{matchup.team_1_score.toFixed(2)}</h1>
            </div>
            {/* Team 2 Name and Score */}
            <div className="flex flex-col items-right">
              <h2 className="text-base font-bold">{matchup.team_2_name}</h2>
              <h1 className="text-4xl font-bold">{matchup.team_2_score.toFixed(2)}</h1>
            </div>
          </div>

          <table className="table-auto w-full border-collapse border border-primary">
            <thead>
              <tr>
                <th className="border border-primary px-2 py-2" style={{ width: "35%" }}>
                  Player
                </th>
                <th className="border border-primary px-2 py-2" style={{ width: "10%" }}>
                  Pts
                </th>
                <th className="border border-primary" style={{ width: "10%" }}></th>
                <th className="border border-primary px-2 py-2" style={{ width: "35%" }}>
                  Player
                </th>
                <th className="border border-primary px-2 py-2" style={{ width: "10%" }}>
                  Pts
                </th>
              </tr>
            </thead>
            <tbody>
              {matchup.team_1_lineup.selections.map((sel1, index) => {
                const sel2 = matchup.team_2_lineup.selections[index] || {} // Ensure index is within team 2's selection
                return (
                  <tr key={index}>
                    {/* Team 1 Player + Score */}
                    {sel1.locked === true ? (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg">
                          {sel1.player_id !== null
                            ? `${sel1.player_name} (${sel1.team_abbreviation})`
                            : "An error occurred"}
                        </td>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-base">
                          {sel1.total_points ? sel1.total_points.toFixed(2) : 0}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg italic" colSpan={2}>
                          {teamId === matchup.team_1_lineup.contestant_id
                            ? "Select on 'Set Lineup' Page"
                            : "Selection Hidden"}
                        </td>
                      </>
                    )}

                    {/* Position */}
                    <td className="border border-primary px-2 py-2 font-extrabold text-sm sm:text-base">
                      {sel1.position
                        ? sel1.position.toUpperCase() === "FLEX"
                          ? "FL"
                          : sel1.position.toUpperCase()
                        : sel2.position?.toUpperCase() || ""}
                    </td>
                    {/* Team 2 Player + Score */}
                    {sel2.locked === true ? (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg">
                          {sel2.player_id !== null
                            ? `${sel2.player_name} (${sel2.team_abbreviation})`
                            : "An error occurred"}
                        </td>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-base">
                          {sel2.total_points ? sel2.total_points.toFixed(2) : 0}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg italic" colSpan={2}>
                          {teamId === matchup.team_2_lineup.contestant_id
                            ? "Select on 'Set Lineup' Page"
                            : "Selection Hidden"}
                        </td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Display for larger screens - separate tables */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-4 sm:gap-8 h-auto sm:h-screen m-4 sm:m-8">
        <div className="flex flex-col">
          <div className="bg-sky-200 rounded flex flex-col justify-center items-center p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mt-4">{matchup.team_1_name}</h2>
            <h1 className="text-4xl sm:text-5xl font-bold my-4">{matchup.team_1_score.toFixed(2)}</h1>
            {/* Table for Team 1 */}
            <div className="flex-grow overflow-auto mb-10 sm:mb-20">
              <table className="table-auto w-full border-collapse border border-primary">
                <thead>
                  <tr>
                    <th className="border border-primary px-2 py-2">Position</th>
                    <th className="border border-primary px-8 sm:px-32 py-2">Player</th>
                    <th className="border border-primary px-2 py-2">Team</th>
                    <th className="border border-primary px-2 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matchup.team_1_lineup.selections.map((sel) => {
                    if (
                      sel.player_id !== null &&
                      (teamId === matchup.team_1_lineup.contestant_id || sel.locked === true)
                    ) {
                      return (
                        <tr key={sel.index}>
                          <td className="border border-primary px-4 py-2 font-extrabold text-base">
                            {sel.position.toUpperCase()}
                          </td>
                          <td className="border border-primary px-4 py-2 font-extrabold text-lg">{sel.player_name}</td>
                          <td className="border border-primary px-4 py-2 font-extrabold">{sel.team_abbreviation}</td>
                          <td className="border border-primary px-4 py-2 font-extrabold">
                            {sel.total_points ? sel.total_points.toFixed(2) : 0}
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={sel.index}>
                        <td className="border border-primary px-4 py-2 font-extrabold text-base">
                          {sel.position.toUpperCase()}
                        </td>
                        <td className="border border-primary px-4 py-2 italic">
                          {teamId === matchup.team_1_lineup.contestant_id
                            ? "Select on 'Set Lineup' Page"
                            : "Selection Hidden"}
                        </td>
                        <td className="border border-primary px-4 py-2"></td>
                        <td className="border border-primary px-4 py-2"></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-sky-200 rounded flex flex-col justify-center items-center p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mt-4">{matchup.team_2_name}</h2>
            <h1 className="text-4xl sm:text-5xl font-bold my-4">{matchup.team_2_score.toFixed(2)}</h1>
            {/* Table for Team 2 */}
            <div className="flex-grow overflow-auto mb-10 sm:mb-20">
              <table className="table-auto w-full border-collapse border border-primary">
                <thead>
                  <tr>
                    <th className="border border-primary px-2 py-2">Position</th>
                    <th className="border border-primary px-8 sm:px-32 py-2">Player</th>
                    <th className="border border-primary px-2 py-2">Team</th>
                    <th className="border border-primary px-2 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matchup.team_2_lineup.selections.map((sel) => {
                    if (
                      sel.player_id !== null &&
                      (teamId === matchup.team_2_lineup.contestant_id || sel.locked === true)
                    ) {
                      return (
                        <tr key={sel.index}>
                          <td className="border border-primary px-4 py-2 font-extrabold text-base">
                            {sel.position.toUpperCase()}
                          </td>
                          <td className="border border-primary px-4 py-2 font-extrabold text-lg">{sel.player_name}</td>
                          <td className="border border-primary px-4 py-2 font-extrabold">{sel.team_abbreviation}</td>
                          <td className="border border-primary px-4 py-2 font-extrabold">
                            {sel.total_points ? sel.total_points.toFixed(2) : 0}
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={sel.index}>
                        <td className="border border-primary px-4 py-2 font-extrabold text-base">
                          {sel.position.toUpperCase()}
                        </td>
                        <td className="border border-primary px-4 py-2 italic">
                          {teamId === matchup.team_2_lineup.contestant_id
                            ? "Select on 'Set Lineup' Page"
                            : "Selection Hidden"}
                        </td>
                        <td className="border border-primary px-4 py-2"></td>
                        <td className="border border-primary px-4 py-2"></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Matchup
