import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function RootLayoutFooter() {
  return (
    <footer className="footer">
      <Container fluid={true}>
        <Row>
          <Col md={6}>{new Date().getFullYear()} © Turistikrota.</Col>
          <Col md={6}>
            <div className="text-sm-end d-none d-sm-block">
              Tüm hakları saklıdır.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
