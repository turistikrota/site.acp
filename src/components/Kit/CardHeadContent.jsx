import React from "react";
import { CardTitle } from "reactstrap";

export default function CardHeadContent({ title, subtitle }) {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <p className="card-title-desc">{subtitle}</p>
    </>
  );
}
