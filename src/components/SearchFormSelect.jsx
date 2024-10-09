import { useSelector } from "react-redux"

const SearchFormSelect = ({ label, name, list, defaultValue, size, onChange, placeholder }) => {
  const { teamFilter } = useSelector((state) => state.lineup)
  let newList = []
  if (!list) {
    newList = [1, 2, 3, 4, 5]
  } else {
    newList = list
  }

  newList = newList.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    )
  })

  newList.unshift(<option key="placeholder">No Filter</option>)

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={teamFilter}
        onChange={onChange}
        placeholder={placeholder}
      >
        {newList}
      </select>
    </div>
  )
}
export default SearchFormSelect
