import axios from "axios"

export const loader = (store) => async () => {
  const { matchupId } = store.getState().matchup
  try {
    const res = await axios.get(`http://localhost:8000/matchup/${matchupId}`, {
      withCredentials: true,
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const Matchup = () => {
  return <div>Matchup</div>
}
export default Matchup
