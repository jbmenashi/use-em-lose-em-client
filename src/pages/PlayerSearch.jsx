import { Form, useLoaderData, useLocation, useNavigate, redirect } from "react-router-dom"
import axios from "axios"
import UnavailableBlock from "../components/UnavailableBlock"
import { useDispatch, useSelector } from "react-redux"
import SearchFormSelect from "../components/SearchFormSelect"
import { clearTeamFilter, filterByTeam, lineupLoadingFalse, changePage } from "../features/lineup/lineupSlice"
import PlayersTable from "../components/PlayersTable"
import { logoutUser } from "../features/user/userSlice"
import PageDropdown from "../components/PageDropdown"
import Loading from "../components/Loading"

export const loader = (store) => async () => {
  const { teamId } = store.getState().league
  const { position, teamFilter, page } = store.getState().lineup
  const { token } = store.getState().user
  let url = `${import.meta.env.VITE_BACKEND_URL}/players/nfl/${teamId}?position=${position}&page=${page}`
  if (teamFilter !== "") {
    url = url + `&teamFilter=${teamFilter}`
  }

  try {
    const [playersRes, contestantRes, teamsRes] = await Promise.all([
      await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/contestant/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams/nfl/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
    const players = playersRes.data
    const contestant = contestantRes.data
    const teams = teamsRes.data
    store.dispatch(lineupLoadingFalse())
    return { players, contestant, teams }
  } catch (error) {
    console.log(error)
    store.dispatch(logoutUser())
    return redirect("/")
  }
}

export const action =
  (store) =>
  async ({ request }) => {
    try {
      const formData = await request.formData()
      const data = Object.fromEntries(formData)
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }

const PlayerSearch = () => {
  const { teams } = useLoaderData()
  const { position, playerSearchLoading } = useSelector((state) => state.lineup)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const teamsAbbv = teams
    .map((team) => {
      return team.abbreviation
    })
    .sort()

  const handleTeamFilterSelect = (val) => {
    if (val !== "No Filter") {
      dispatch(filterByTeam({ teamFilter: val }))
      navigate(`${location.pathname}?position=${position}&teamFilter=${val}`)
    } else {
      dispatch(clearTeamFilter())
      navigate(`${location.pathname}?position=${position}`)
    }
  }

  const handlePageSelect = (val) => {
    dispatch(changePage({ page: val }))
    navigate(`${location.pathname}?position=${position}&page=${val}`)
  }

  if (playerSearchLoading) {
    return <Loading />
  }

  return (
    <>
      <div className="flex flex-col items-center my-2">
        <h1 className="text-4xl font-bold my-8">Player Search: {position}</h1>
        <div className="w-full sm:w-3/4 bg-accent flex overflow-auto p-2 rounded">
          <UnavailableBlock />
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <Form method="POST" className="rounded flex flex-row items-center space-x-4">
            <SearchFormSelect
              name="teamFilter"
              label="Filter By Team"
              list={teamsAbbv}
              size="select-sm"
              onChange={(e) => handleTeamFilterSelect(e.target.value)}
            />
            <PageDropdown
              name="pageSelector"
              label="Page"
              list={[1, 2, 3, 4, 5]}
              size="select-sm"
              onChange={(e) => handlePageSelect(e.target.value)}
            />
          </Form>
        </div>
        <div className="w-full flex justify-center my-8">
          <PlayersTable />
        </div>
      </div>
    </>
  )
}
export default PlayerSearch
