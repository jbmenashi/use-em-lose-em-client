import { useSelector } from "react-redux"
import HomeLoggedOut from "../components/HomeLoggedOut"
import HomeLoggedIn from "../components/HomeLoggedIn"
import axios from "axios"
import { loadLeagues } from "../features/user/userSlice"

export const loader = (store) => async () => {
  const { user, userId, token } = store.getState().user
  if (!user) {
    return null
  } else {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contestant/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      store.dispatch(loadLeagues(res.data))
      return res.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

const Home = () => {
  const user = useSelector((state) => state.user.user)
  if (!user) {
    return <HomeLoggedOut />
  }
  return <HomeLoggedIn />
}
export default Home
