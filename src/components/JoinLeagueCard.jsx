import { redirect } from "react-router-dom"
import { getLeagueTeamInfo } from "../features/league/leagueSlice"
import FormInput from "./FormInput"
import SubmitBtn from "./SubmitBtn"
import { Form } from "react-router-dom"
import { toast } from "react-toastify"
import { api } from "../api/client"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      const res = await api.post(`/contestants/${data.leagueId}?teamName=${data.teamName}`, null)
      if (res.status === 201) {
        const contestantId = res.data.contestant._id
        const leagueId = data.leagueId
        const leagueName = data.leagueName
        const teamName = data.teamName
        store.dispatch(getLeagueTeamInfo({ leagueId, leagueName, contestantId, teamName }))
        if (res.data.leagueFull && data.style === "Head to Head") {
          try {
            await api.post(`/leagues/${leagueId}/schedule`)
          } catch (scheduleError) {
            console.error("[JoinLeagueCard action] failed to generate schedule", {
              url: scheduleError?.config?.url,
              method: scheduleError?.config?.method,
              status: scheduleError?.response?.status,
              statusText: scheduleError?.response?.statusText,
              responseData: scheduleError?.response?.data,
              message: scheduleError?.message,
              leagueId,
            })
          }
        }
        return redirect(`/leagues/${data.leagueId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error("You must be logged in to create a league")
      return null
    }
  }

const JoinLeagueCard = ({ league }) => {
  const { leagueName, sport, style } = league
  const leagueId = league._id
  const modalId = `join_league_modal_${leagueId}`

  return (
    <div className="card w-96 bg-secondary shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title">{leagueName}</h2>
        <p>Sport: {sport}</p>
        <p>Style: {style}</p>
        <button className="btn btn-primary" onClick={() => document.getElementById(modalId).showModal()}>
          Join League
        </button>
        <dialog id={modalId} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Join {leagueName}</h3>
            <Form method="POST" className="flex flex-col gap-4 mt-4">
              <FormInput type="text" name="leagueId" defaultValue={leagueId} hidden={true} />
              <FormInput type="text" name="leagueName" defaultValue={leagueName} hidden={true} />
              <FormInput type="text" name="style" defaultValue={style} hidden={true} />
              <FormInput type="text" label="team name" name="teamName" />
              <div className="modal-action">
                <SubmitBtn text="Join!" />
              </div>
            </Form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  )
}
export default JoinLeagueCard
