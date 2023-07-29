import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import error from "@/assets/images/error-img.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";

function DelayedNotFound({ delay = 100, title }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, delay);
  }, []);

  return visible ? <NotFoundView title={title} /> : null;
}

function NotFoundView({ title }) {
  const { t } = useTranslation("error");
  document.title = `${t("404.meta-title")} | Turistikrota`;

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 fw-medium">
                  4<i className="bx bx-buoy bx-spin text-primary display-3" />4
                </h1>
                <h4>
                  {t("404.content", { title: title || t("404.unknown") })}
                </h4>
                <div className="mt-5 text-center">
                  <Link className="btn btn-primary " to="/">
                    {t("404.button")}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

NotFoundView.Delayed = DelayedNotFound;

export default NotFoundView;
