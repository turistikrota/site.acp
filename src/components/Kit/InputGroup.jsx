import React from "react";
import { Label } from "reactstrap";

export default function InputGroup({ children, label, htmlFor }) {
  return (
    <div className="mb-3">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
