import React from "react";
import { Container } from "reactstrap";

export default function PageContentLayout({ children }) {
  return (
    <div className="page-content">
      <Container fluid>{children}</Container>
    </div>
  );
}
