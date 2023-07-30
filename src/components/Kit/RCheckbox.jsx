export default function RCheckbox({ value, name, onChange, children, id }) {
  return (
    <div className="form-check form-switch form-switch-md mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
