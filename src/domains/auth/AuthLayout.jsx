import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

export default function AuthLayout() {
  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
