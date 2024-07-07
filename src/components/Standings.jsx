import { useLoaderData } from "react-router-dom"

const Standings = () => {
  const { standings } = useLoaderData()
  return <div>Standings</div>
}
export default Standings
