import { useLoaderData } from "react-router-dom"

const Schedule = () => {
  const { schedule } = useLoaderData()
  return <div className="h-full bg-sky-200 flex justify-center items-center rounded-lg">Schedule</div>
}
export default Schedule
