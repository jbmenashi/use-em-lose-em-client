import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import UnavailableBlock from "../components/UnavailableBlock"
import { useDispatch, useSelector } from "react-redux"

export const loader = (store) => async () => {
  const { teamId } = store.getState().league
  const { lineup, index, position, page } = store.getState().lineup

  try {
    const res = await axios.get(`http://localhost:8000/players/nfl/${teamId}?position=${position}&page=${page}`, {
      withCredentials: true,
    })
    const players = res.data
    return { players }
  } catch (error) {
    console.log(error)
    return null
  }
}

const PlayerSearch = () => {
  const players = useLoaderData()
  console.log(players)
  return <div>PlayerSearch</div>
}
export default PlayerSearch
