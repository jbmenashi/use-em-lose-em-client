import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { getLeagueTeamInfo } from "../features/league/leagueSlice"

const JoinLeagueCard = ({ league }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userId } = useSelector((state) => state.user)

  const { league_name, sport, style } = league
  const league_id = league["_id"]["$oid"]

  const handleClick = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/contestant/${league_id}`, null, {
        withCredentials: true,
      })
      if (res.status === 201) {
        const contestant_id = res.data.contestant["_id"]["$oid"]
        dispatch(getLeagueTeamInfo({ league_id, league_name, contestant_id }))
        navigate(`/leagues/${league_id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card w-96 bg-secondary shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title">{league_name}</h2>
        <p>Sport: {sport}</p>
        <p>Style: {style}</p>
        <button className="btn btn-neutral" onClick={handleClick}>
          Join League
        </button>
      </div>
    </div>
  )
}
export default JoinLeagueCard
