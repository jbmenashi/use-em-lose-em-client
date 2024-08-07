import axios from "axios"
import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"

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
    return null
  }
}

const Matchup = () => {
  const matchup = useLoaderData()
  const { leagueName, teamId } = useSelector((state) => state.league)
  return (
    <div>
      <h1 className="text-center text-3xl font-bold m-4">
        {leagueName} - Week {matchup.week} {matchup.season_type === "REG" ? "(Regular Season)" : "(Playoffs)"}
      </h1>
      <div className="grid grid-cols-2 gap-8 h-screen m-8">
        <div className="flex flex-col">
          <div className="bg-sky-200 rounded flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mt-4">{matchup.team_1_name}</h2>
            <h1 className="text-5xl font-bold my-4">{matchup.team_1_score}</h1>
            <div className="flex-grow mb-20">
              <table className="table w-full border-collapse border border-primary">
                <thead>
                  <tr>
                    <th className="border border-primary px-2">Position</th>
                    <th className="border border-primary px-32 py-2">Player</th>
                    <th className="border border-primary px-4 py-2">Team</th>
                    <th className="border border-primary px-4 py-2">Score</th>
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
                            {sel.total_points ? sel.total_points : 0}
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={sel.index}>
                        <td className="border border-primary px-4 py-2 font-extrabold text-base">
                          {sel.position.toUpperCase()}
                        </td>
                        <td className="border border-primary px-4 py-2">
                          {teamId === matchup.team_1_lineup.contestant_id
                            ? "Make Your Selection on the 'My Team' Page"
                            : "Selection Revealed Once Locked"}
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
          <div className="bg-sky-200 rounded flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mt-4">{matchup.team_2_name}</h2>
            <h1 className="text-5xl font-bold my-4">{matchup.team_2_score}</h1>
            <div className="flex-grow mb-20">
              <table className="table w-full border-collapse border border-primary">
                <thead>
                  <tr>
                    <th className="border border-primary px-2">Position</th>
                    <th className="border border-primary px-32 py-2">Player</th>
                    <th className="border border-primary px-4 py-2">Team</th>
                    <th className="border border-primary px-4 py-2">Score</th>
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
                            {sel.total_points ? sel.total_points : 0}
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={sel.index}>
                        <td className="border border-primary px-4 py-2 font-extrabold text-base">
                          {sel.position.toUpperCase()}
                        </td>
                        <td className="border border-primary px-4 py-2">
                          {teamId === matchup.team_2_lineup.contestant_id
                            ? "Make Your Selection on the 'Set Lineup' Page"
                            : "Selection Revealed Once Locked"}
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
