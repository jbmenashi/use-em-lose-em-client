import { useSelector } from "react-redux"
import HomeLoggedOut from "../components/HomeLoggedOut"
import HomeLoggedIn from "../components/HomeLoggedIn"

const Home = () => {
  const user = useSelector((state) => state.user.user)
  if (!user) {
    return <HomeLoggedOut />
  }
  return <HomeLoggedIn />
}
export default Home
