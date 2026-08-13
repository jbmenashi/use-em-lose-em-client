import SubmitBtn from "../components/SubmitBtn"
import FormInput from "../components/FormInput"
import FormSelect from "../components/FormSelect"
import FormSelectDisabled from "../components/FormSelectDisabled"
import FormRange from "../components/FormRange"
import { Form, Link, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { api } from "../api/client"
import { useState } from "react"

const playoffFormats = [
  { label: "1 week, 2 teams", playoffWeeks: 1, playoffTeams: 2 },
  { label: "2 weeks, 4 teams", playoffWeeks: 2, playoffTeams: 4 },
  { label: "3 weeks, 6 teams", playoffWeeks: 3, playoffTeams: 6 },
  { label: "3 weeks, 8 teams", playoffWeeks: 3, playoffTeams: 8 },
]

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const isHeadToHead = data.style === "Head to Head"
    const playoffFormat = playoffFormats.find((format) => format.label === data.playoff_format)
    const regularSeasonWeeks = parseInt(data.regular_season_weeks)
    const playoffWeeks = isHeadToHead ? (playoffFormat?.playoffWeeks ?? 0) : 0

    if (regularSeasonWeeks + playoffWeeks > 18) {
      toast.error("Regular season weeks plus playoff weeks can't be more than 18")
      return null
    }

    const transformedData = {
      leagueName: data.league_name,
      teamName: data.team_name,
      sport: data.sport,
      season: 2024,
      style: data.style,
      size: data.num_teams,
      playoffTeams: isHeadToHead ? (playoffFormat?.playoffTeams ?? 0) : 0,
      regularSeasonWeeks,
      playoffWeeks,
      teamCount: data.num_players_franchise,
      roster: {
        rosterSize: 8,
        positions: {
          QB: parseInt(data.qb),
          RB: parseInt(data.rb),
          WR: parseInt(data.wr),
          TE: parseInt(data.te),
          FLEX: parseInt(data.flex),
          DEF: parseInt(data.def),
        },
      },
      scoring: {
        statistics: {
          passYds: 0.04,
          passTds: 4,
          ints: -1,
          rushYds: 0.1,
          receptions: 0.5,
          recYds: 0.1,
          tds: 6,
          fumbles: -2,
          twoPtConv: 2,
          defSacks: 1,
          defFumbleRec: 2,
          defInts: 2,
          defBlkKicks: 2,
          defSafeties: 3,
          defTdsScored: 6,
          defPtsAllowed: 0,
        },
      },
      scheduled: false,
      active: false,
      full: false,
    }
    try {
      const res = await api.post("/leagues", transformedData)
      if (res.status === 201) {
        toast.success("New League Created")
        if (res.data.leagueFull && res.data.league.style === "Head to Head") {
          try {
            await api.post(`/leagues/${res.data.league._id}/schedule`)
          } catch (scheduleError) {
            console.error("[CreateLeague action] failed to generate schedule", {
              url: scheduleError?.config?.url,
              method: scheduleError?.config?.method,
              status: scheduleError?.response?.status,
              statusText: scheduleError?.response?.statusText,
              responseData: scheduleError?.response?.data,
              message: scheduleError?.message,
              leagueId: res.data.league._id,
            })
          }
        }
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

const CreateLeague = () => {
  const [sport, setSport] = useState("NFL")
  const [style, setStyle] = useState(styles[0])
  const handleSportSelect = (val) => {
    setSport(val)
  }
  const handleStyleSelect = (val) => {
    setStyle(val)
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
        <FormSelect
          label="select style"
          name="style"
          list={styles}
          size="select-sm"
          defaultValue={styles[0]}
          onChange={(e) => handleStyleSelect(e.target.value)}
        />
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
        {/* REGULAR SEASON WEEKS */}
        <FormRange
          label="select number of regular season weeks"
          name="regular_season_weeks"
          size="range-sm"
          teams={14}
          min={1}
          max={20}
          step={1}
        />
        {/* PLAYOFFS (Head to Head only) */}
        {style === "Head to Head" && (
          <FormSelect
            label="select playoff format"
            name="playoff_format"
            list={playoffFormats.map((format) => format.label)}
            size="select-sm"
            defaultValue={playoffFormats[0].label}
          />
        )}
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
