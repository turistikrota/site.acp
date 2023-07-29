import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbItem, Col, Row } from "reactstrap";

function Item({ to, children }) {
  return (
    <BreadcrumbItem>
      <Link to={to}>{children}</Link>
    </BreadcrumbItem>
  );
}

function Current({ children }) {
  return <BreadcrumbItem active>{children}</BreadcrumbItem>;
}

function NewButton({ to, children }) {
  return (
    <BreadcrumbItem>
      <Link to={to}>
        <button className="btn btn-primary">{children}</button>
      </Link>
    </BreadcrumbItem>
  );
}

function RBreadcrumb({ title, children }) {
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">{children}</ol>
          </div>
        </div>
      </Col>
    </Row>
  );
}

RBreadcrumb.Item = Item;
RBreadcrumb.Current = Current;
RBreadcrumb.NewButton = NewButton;

export default RBreadcrumb;
