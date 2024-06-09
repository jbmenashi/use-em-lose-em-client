import { useState } from "react"
const FormRange = ({ label, name, size, teams, min, max, step }) => {
  const [selectedTeams, setselectedTeams] = useState(teams ? teams : max)

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{selectedTeams}</span>
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={selectedTeams}
        onChange={(e) => setselectedTeams(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
    </div>
  )
}
export default FormRange
