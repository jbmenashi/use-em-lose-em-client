import { useLoaderData } from "react-router-dom"

const Schedule = () => {
  const { schedule } = useLoaderData()
  return <div className="h-full bg-red-300 flex justify-center items-center">Schedule</div>
}
export default Schedule
