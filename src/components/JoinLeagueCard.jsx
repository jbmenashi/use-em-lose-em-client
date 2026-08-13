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

  return (
    <div className="card w-96 bg-secondary shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title">{leagueName}</h2>
        <p>Sport: {sport}</p>
        <p>Style: {style}</p>
        <button className="btn btn-primary" onClick={() => document.getElementById("my_modal_1").showModal()}>
          Join League
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="modal-action">
              <Form method="POST" className="m-8 p-8 rounded bg-base-200 shadow-lg grid gap-y-4 gap-x-6 w-2/3">
                <FormInput type="text" name="leagueId" defaultValue={leagueId} hidden={true} />
                <FormInput type="text" name="leagueName" defaultValue={leagueName} hidden={true} />
                <FormInput type="text" label="team name" name="teamName" />
                <div className="mt-4">
                  <SubmitBtn text="Join!" />
                </div>
              </Form>
              <button className="btn" onClick={() => document.getElementById("my_modal_1").close()}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}
export default JoinLeagueCard
