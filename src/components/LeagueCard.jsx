import { Link, Navigate } from "react-router-dom"

const LeagueCard = ({ league }) => {
  const { league_id } = league
  //   console.log(league_id.$oid)

  const handleClick = () => {}

  return (
    <Link to={`/leagues/${league_id.$oid}`}>
      <div className="card w-96 bg-base-200 shadow-xl m-5">
        <div className="card-body">
          <h2 className="card-title">League Name</h2>
          <p>Team Name (eventually record)</p>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary text-white" onClick={handleClick}>
              Go to League Page
            </button> */}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default LeagueCard
