import { useUser } from "@clerk/clerk-react"
import HomeLoggedOut from "../components/HomeLoggedOut"
import HomeLoggedIn from "../components/HomeLoggedIn"
import { api } from "../api/client"
import { loadLeagues } from "../features/user/userSlice"

export const loader = (store) => async () => {
  if (!window.Clerk?.session) {
    return null
  }
  try {
    const res = await api.get("/contestants/me")
    store.dispatch(loadLeagues(res.data))
    return res.data
  } catch (error) {
    console.error("[Home loader] failed to load user contestant data", {
      url: error?.config?.url,
      method: error?.config?.method,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      responseData: error?.response?.data,
      message: error?.message,
    })
    throw error
  }
}

const Home = () => {
  const { isSignedIn } = useUser()
  if (!isSignedIn) {
    return <HomeLoggedOut />
  }
  return <HomeLoggedIn />
}
export default Home
