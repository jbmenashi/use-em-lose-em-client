import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { getLeagueTeamInfo } from "../features/league/leagueSlice"
import { useState } from "react"
import FormInput from "./FormInput"
import SubmitBtn from "./SubmitBtn"
import { Form } from "react-router-dom"
import { toast } from "react-toastify"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      const res = await axios.post(
        `http://localhost:8000/contestant/${data.league_id}?team_name=${data.team_name}`,
        null,
        {
          withCredentials: true,
        }
      )
      if (res.status === 201) {
        const contestant_id = res.data.contestant["_id"]["$oid"]
        const league_id = data.league_id
        const league_name = data.league_name
        store.dispatch(getLeagueTeamInfo({ league_id, league_name, contestant_id }))
        return redirect(`/leagues/${data.league_id}`)
      }
    } catch (error) {
      console.log(error)
      toast.error("You must be logged in to create a league")
      return null
    }
  }

const JoinLeagueCard = ({ league }) => {
  const { league_name, sport, style } = league
  const league_id = league["_id"]["$oid"]

  return (
    <div className="card w-96 bg-secondary shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title">{league_name}</h2>
        <p>Sport: {sport}</p>
        <p>Style: {style}</p>
        <button className="btn btn-primary" onClick={() => document.getElementById("my_modal_1").showModal()}>
          Join League
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="modal-action">
              <Form method="POST" className="m-8 p-8 rounded bg-base-200 shadow-lg grid gap-y-4 gap-x-6 w-2/3">
                <FormInput type="text" name="league_id" defaultValue={league_id} hidden={true} />
                <FormInput type="text" name="league_name" defaultValue={league_name} hidden={true} />
                <FormInput type="text" label="team name" name="team_name" />
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
