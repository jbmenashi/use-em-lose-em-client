const PageDropdown = ({ label, name, list, defaultValue, size, onChange, placeholder }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={list[0]}
        onChange={onChange}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  )
}
export default PageDropdown
