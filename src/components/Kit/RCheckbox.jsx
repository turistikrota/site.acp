export default function RCheckbox({
  value,
  name,
  onChange,
  children,
  id,
  invalid,
}) {
  return (
    <div className="form-check form-switch form-switch-md mb-3">
      <input
        type="checkbox"
        className={`form-check-input ${invalid ? "is-invalid" : ""} `}
        id={id}
        name={name}
        checked={value}
        onChange={onChange}
        aria-invalid={invalid}
      />
      <label className="form-check-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
