import SubmitBtn from "../components/SubmitBtn"
import FormInput from "../components/FormInput"
import FormSelect from "../components/FormSelect"
import FormSelectDisabled from "../components/FormSelectDisabled"
import FormRange from "../components/FormRange"
import { Form, Link, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { loginUser } from "../features/user/userSlice"
import { useState } from "react"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const transformedData = {
      league_name: data.league_name,
      team_name: data.team_name,
      sport: data.sport,
      season: 2024,
      style: data.style,
      size: data.num_teams,
      playoff_teams: data.num_playoff_teams,
      regular_season_weeks: 13,
      playoff_weeks: 3,
      team_count: data.num_players_franchise,
      roster: {
        roster_size: 8,
        positions: {
          qb: data.qb,
          rb: data.rb,
          wr: data.wr,
          te: data.te,
          flex: data.flex,
          def: data.def,
        },
      },
      scoring: {
        statistics: {
          pass_yds: 0.04,
          pass_tds: 4,
          int: -1,
          rush_yds: 0.1,
          rec: 0.5,
          rec_yds: 0.1,
          tds: 6,
          fumbles: -2,
          two_point: 2,
        },
      },
      locked: false,
      active: false,
    }
    try {
      const res = await axios.post("http://localhost:8000/league", transformedData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (res.status === 201) {
        toast.success("New League Created")
        // const res2 = await axios.get(`http://localhost:8000/league/${store.getState.league}`, {
        //   withCredentials: true,
        // })
      }
      return redirect("/")
    } catch (error) {
      console.log(error)
      toast.error("You must be logged in to create a league")
      return null
    }
  }

const sports = ["NFL", "MLB"]
const styles = ["Head to Head", "Rotisserie"]
const playoffTeams = [4, 6, 8]

const CreateLeague = () => {
  const [sport, setSport] = useState("NFL")
  const handleSportSelect = (val) => {
    setSport(val)
  }

  return (
    <section className="grid place-items-center bg-neutral">
      <Form method="POST" className="m-8 p-8 rounded bg-base-200 shadow-lg grid gap-y-4 gap-x-6 w-2/3">
        <h4 className="text-center text-3xl font-bold">Create League</h4>
        {/* LEAGUE NAME (TEXT INPUT) */}
        <FormInput type="text" label="league name" name="league_name" />
        {/* SPORT */}
        <FormSelect
          label="select sport"
          name="sport"
          list={sports}
          size="select-sm"
          defaultValue={sports[0]}
          onChange={(e) => handleSportSelect(e.target.value)}
        />
        {/* STYLE */}
        <FormSelect label="select style" name="style" list={styles} size="select-sm" defaultValue={styles[0]} />
        {/* NUMBER OF TEAMS */}
        <FormRange
          label="select number of teams"
          name="num_teams"
          size="range-sm"
          teams={12}
          min={2}
          max={20}
          step={2}
        />
        {/* PLAYOFF TEAMS */}
        <FormSelect
          label="select number of playoff teams"
          name="num_playoff_teams"
          list={playoffTeams}
          size="select-sm"
          defaultValue={playoffTeams[0]}
        />
        {/* MAX PLAYERS PER TEAM */}
        <FormRange
          label="max number of players that can be used per franchise"
          name="num_players_franchise"
          size="range-sm"
          teams={5}
          min={4}
          max={10}
          step={1}
        />
        {/* LINEUP POSITIONS */}
        <div className="grid grid-cols-8 gap-4">
          {sport === "NFL" ? (
            <>
              <h4 className="items-center">Positions</h4>
              <FormSelect label="QB" name="qb" size="select-sm" defaultValue={1} />
              <FormSelect label="RB" name="rb" size="select-sm" defaultValue={2} />
              <FormSelect label="WR" name="wr" size="select-sm" defaultValue={2} />
              <FormSelect label="TE" name="te" size="select-sm" defaultValue={1} />
              <FormSelect label="FLEX" name="flex" size="select-sm" defaultValue={1} />
              <FormSelect label="DEF" name="def" size="select-sm" defaultValue={1} />
            </>
          ) : (
            <>
              <h4 className="items-center">Positions</h4>
              <FormSelect label="C" name="c" size="select-sm" defaultValue={1} />
              <FormSelect label="IF" name="if" size="select-sm" defaultValue={2} />
              <FormSelect label="OF" name="of" size="select-sm" defaultValue={2} />
              <FormSelect label="UT" name="ut" size="select-sm" defaultValue={1} />
            </>
          )}
        </div>
        {/* SCORING */}
        <div className="grid grid-cols-10 gap-4">
          {sport === "NFL" ? (
            <>
              <h4 className="items-center">Scoring</h4>
              <FormSelectDisabled label="Pass Yds" name="pass_yds" size="select-sm" defaultValue={0.04} />
              <FormSelectDisabled label="Pass TDs" name="pass_tds" size="select-sm" defaultValue={4} />
              <FormSelectDisabled label="Ints" name="ints" size="select-sm" defaultValue={-1} />
              <FormSelectDisabled label="Rush Yds" name="rush_yds" size="select-sm" defaultValue={0.1} />
              <FormSelectDisabled label="Rec" name="rec" size="select-sm" defaultValue={0.5} />
              <FormSelectDisabled label="Rec Yds" name="rec_yds" size="select-sm" defaultValue={0.1} />
              <FormSelectDisabled label="TDs" name="tds" size="select-sm" defaultValue={6} />
              <FormSelectDisabled label="Fumbles" name="fumbles" size="select-sm" defaultValue={-2} />
              <FormSelectDisabled label="2pt Conv" name="two_point" size="select-sm" defaultValue={2} />
            </>
          ) : (
            <>
              <h4 className="items-center">Scoring</h4>
              <FormSelectDisabled label="Hits" name="hits" size="select-sm" defaultValue={1} />
              <FormSelectDisabled label="Home Runs" name="home_runs" size="select-sm" defaultValue={1} />
              <FormSelectDisabled label="RBIs" name="rbis" size="select-sm" defaultValue={1} />
            </>
          )}
        </div>
        <FormInput type="text" label="team name" name="team_name" />
        <div className="mt-4">
          <SubmitBtn text="create!" />
        </div>
      </Form>
    </section>
  )
}
export default CreateLeague
