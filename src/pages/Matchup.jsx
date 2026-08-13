import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import { api } from "../api/client"

export const loader = (store) => async ({ params }) => {
  const { matchup_id: matchupId } = params
  try {
    const res = await api.get(`/matchups/${matchupId}`)
    return res.data
  } catch (error) {
    if (error?.response?.status === 404) {
      return null
    }
    console.error("[Matchup loader] failed to load matchup data", {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      responseData: error?.response?.data,
      message: error?.message,
      matchupId,
    })
    throw error
  }
}

const Matchup = () => {
  const matchup = useLoaderData()
  const { leagueName, teamId } = useSelector((state) => state.league)

  if (!matchup) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-xl font-semibold">Matchup Will Become Available Once League Is Full</p>
        </div>
      </main>
    )
  }

  return (
    <div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold m-4">
        {leagueName} - Week {matchup.week} {matchup.seasonType === "REG" ? "(Regular Season)" : "(Playoffs)"}
      </h1>

      {/* Display for small screens - combined table */}
      <div className="block sm:hidden">
        <div className="bg-sky-200 rounded flex flex-col justify-center items-center py-4 px-1 sm:p-6">
          {/* Flexbox for Team Names and Scores */}
          <div className="flex justify-between w-full px-1 mb-4">
            {/* Team 1 Name and Score */}
            <div className="flex flex-col items-left">
              <h2 className="text-base font-bold">{matchup.team1Name}</h2>
              <h1 className="text-4xl font-bold">{matchup.team1Score.toFixed(2)}</h1>
            </div>
            {/* Team 2 Name and Score */}
            <div className="flex flex-col items-right">
              <h2 className="text-base font-bold">{matchup.team2Name}</h2>
              <h1 className="text-4xl font-bold">{matchup.team2Score.toFixed(2)}</h1>
            </div>
          </div>

          <table className="table-auto w-full border-collapse border border-primary">
            <thead>
              <tr>
                <th className="border border-primary px-8 py-2" style={{ width: "35%" }}>
                  Player
                </th>
                <th className="border border-primary px-2 py-2" style={{ width: "10%" }}>
                  Pts
                </th>
                <th className="border border-primary" style={{ width: "10%" }}></th>
                <th className="border border-primary px-8 py-2" style={{ width: "35%" }}>
                  Player
                </th>
                <th className="border border-primary px-2 py-2" style={{ width: "10%" }}>
                  Pts
                </th>
              </tr>
            </thead>
            <tbody>
              {matchup.team1Lineup.selections.map((sel1, index) => {
                const sel2 = matchup.team2Lineup.selections[index] || {} // Ensure index is within team 2's selection
                return (
                  <tr key={index}>
                    {/* Team 1 Player + Score */}
                    {sel1.playerId !== null &&
                    (teamId === matchup.team1Lineup.contestantId || sel1.locked === true) ? (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg">
                          {sel1.playerId !== null ? (
                            sel1.location && sel1.opponent && sel1.gameTime ? (
                              sel1.location === "Away" ? (
                                <>
                                  <div className="font-bold">{`${sel1.playerName}`}</div>
                                  <div>{`${sel1.teamAbbreviation} @ ${sel1.opponent}`}</div>
                                  <div>{`${sel1.gameTime}`}</div>
                                </>
                              ) : (
                                <>
                                  <div className="font-bold">{`${sel1.playerName}`}</div>
                                  <div>{`${sel1.teamAbbreviation} vs ${sel1.opponent}`}</div>
                                  <div>{`${sel1.gameTime}`}</div>
                                </>
                              )
                            ) : (
                              <>
                                <div className="font-bold">{`${sel1.playerName}`}</div>
                                <div>{`${sel1.teamAbbreviation}`}</div>
                              </>
                            )
                          ) : (
                            "An error occurred"
                          )}
                        </td>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-base font-bold">
                          {sel1.totalPoints ? sel1.totalPoints.toFixed(2) : 0}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg italic" colSpan={2}>
                          {teamId === matchup.team1Lineup.contestantId
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
                    {sel2.playerId !== null &&
                    (teamId === matchup.team2Lineup.contestantId || sel2.locked === true) ? (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg">
                          {sel2.playerId !== null ? (
                            sel2.location && sel2.opponent && sel2.gameTime ? (
                              sel2.location === "Away" ? (
                                <>
                                  <div className="font-bold">{`${sel2.playerName}`}</div>
                                  <div>{`${sel2.teamAbbreviation} @ ${sel2.opponent}`}</div>
                                  <div>{`${sel2.gameTime}`}</div>
                                </>
                              ) : (
                                <>
                                  <div className="font-bold">{`${sel2.playerName}`}</div>
                                  <div>{`${sel2.teamAbbreviation} vs ${sel2.opponent}`}</div>
                                  <div>{`${sel2.gameTime}`}</div>
                                </>
                              )
                            ) : (
                              <>
                                <div className="font-bold">{`${sel2.playerName}`}</div>
                                <div>{`${sel2.teamAbbreviation}`}</div>
                              </>
                            )
                          ) : (
                            "An error occurred"
                          )}
                        </td>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-base">
                          {sel2.totalPoints ? sel2.totalPoints.toFixed(2) : 0}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-primary px-2 py-2 text-xs sm:text-lg italic" colSpan={2}>
                          {teamId === matchup.team2Lineup.contestantId
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
            <h2 className="text-xl sm:text-2xl font-bold mt-4">{matchup.team1Name}</h2>
            <h1 className="text-4xl sm:text-5xl font-bold my-4">{matchup.team1Score.toFixed(2)}</h1>
            {/* Table for Team 1 */}
            <div className="flex-grow overflow-auto mb-10 sm:mb-20">
              <table className="table-auto w-full border-collapse border border-primary">
                <thead>
                  <tr>
                    <th className="border border-primary px-3 py-2">Position</th>
                    <th className="border border-primary px-14 sm:px-20 py-2">Player</th>
                    <th className="border border-primary px-3 py-2">Team</th>
                    <th className="border border-primary px-6 py-2">Game</th>
                    <th className="border border-primary px-3 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matchup.team1Lineup.selections.map((sel) => {
                    if (
                      sel.playerId !== null &&
                      (teamId === matchup.team1Lineup.contestantId || sel.locked === true)
                    ) {
                      return (
                        <tr key={sel.index}>
                          <td className="border border-primary px-3 py-2 font-extrabold text-base">
                            {sel.position.toUpperCase()}
                          </td>
                          <td className="border border-primary px-3 py-2 font-extrabold text-lg">{sel.playerName}</td>
                          <td className="border border-primary px-3 py-2 font-extrabold">{sel.teamAbbreviation}</td>
                          <td className="border border-primary px-3 py-2 font-bold text-sm">
                            {sel.location ? (
                              <>
                                <div>{sel.location === "Away" ? `@ ${sel.opponent}` : `vs ${sel.opponent}`}</div>
                                <div>{sel.gameTime}</div>
                              </>
                            ) : (
                              <>
                                <div>{sel.opponent}</div>
                                <div>{sel.gameTime}</div>
                              </>
                            )}
                          </td>
                          <td className="border border-primary px-3 py-2 font-extrabold">
                            {sel.totalPoints ? sel.totalPoints.toFixed(2) : 0}
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={sel.index}>
                        <td className="border border-primary px-3 py-2 font-extrabold text-base">
                          {sel.position.toUpperCase()}
                        </td>
                        <td className="border border-primary px-3 py-2 italic">
                          {teamId === matchup.team1Lineup.contestantId
                            ? "Select on 'Set Lineup' Page"
                            : "Selection Hidden"}
                        </td>
                        <td className="border border-primary px-3 py-2"></td>
                        <td className="border border-primary px-3 py-2"></td>
                        <td className="border border-primary px-3 py-2"></td>
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
            <h2 className="text-xl sm:text-2xl font-bold mt-4">{matchup.team2Name}</h2>
            <h1 className="text-4xl sm:text-5xl font-bold my-4">{matchup.team2Score.toFixed(2)}</h1>
            {/* Table for Team 2 */}
            <div className="flex-grow overflow-auto mb-10 sm:mb-20">
              <table className="table-auto w-full border-collapse border border-primary">
                <thead>
                  <tr>
                    <th className="border border-primary px-3 py-2">Position</th>
                    <th className="border border-primary px-14 sm:px-20 py-2">Player</th>
                    <th className="border border-primary px-3 py-2">Team</th>
                    <th className="border border-primary px-6 py-2">Game</th>
                    <th className="border border-primary px-3 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matchup.team2Lineup.selections.map((sel) => {
                    if (
                      sel.playerId !== null &&
                      (teamId === matchup.team2Lineup.contestantId || sel.locked === true)
                    ) {
                      return (
                        <tr key={sel.index}>
                          <td className="border border-primary px-3 py-2 font-extrabold text-base">
                            {sel.position.toUpperCase()}
                          </td>
                          <td className="border border-primary px-3 py-2 font-extrabold text-lg">{sel.playerName}</td>
                          <td className="border border-primary px-3 py-2 font-extrabold">{sel.teamAbbreviation}</td>
                          <td className="border border-primary px-3 py-2 font-bold text-sm">
                            {sel.location ? (
                              <>
                                <div>{sel.location === "Away" ? `@ ${sel.opponent}` : `vs ${sel.opponent}`}</div>
                                <div>{sel.gameTime}</div>
                              </>
                            ) : (
                              <>
                                <div>{sel.opponent}</div>
                                <div>{sel.gameTime}</div>
                              </>
                            )}
                          </td>
                          <td className="border border-primary px-3 py-2 font-extrabold">
                            {sel.totalPoints ? sel.totalPoints.toFixed(2) : 0}
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={sel.index}>
                        <td className="border border-primary px-3 py-2 font-extrabold text-base">
                          {sel.position.toUpperCase()}
                        </td>
                        <td className="border border-primary px-3 py-2 italic">
                          {teamId === matchup.team2Lineup.contestantId
                            ? "Select on 'Set Lineup' Page"
                            : "Selection Hidden"}
                        </td>
                        <td className="border border-primary px-3 py-2"></td>
                        <td className="border border-primary px-3 py-2"></td>
                        <td className="border border-primary px-3 py-2"></td>
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
