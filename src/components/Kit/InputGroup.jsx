import { Label } from "reactstrap";

export default function InputGroup({ children, label, htmlFor, error }) {
  return (
    <div className="mb-3">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {!!error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
