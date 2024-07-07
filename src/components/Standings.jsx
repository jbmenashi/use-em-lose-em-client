import { useLoaderData } from "react-router-dom"

const Standings = () => {
  const { standings } = useLoaderData()
  return <div className="h-full bg-blue-300 flex justify-center items-center">Standings</div>
}
export default Standings
