import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import error from "@/assets/images/error-img.png";
import { useTranslation } from "react-i18next";

const NotAuthorizedView = ({ title }) => {
  const { t } = useTranslation("error");
  document.title = `${t("403.meta-title")} | Turistikrota`;

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 fw-medium">
                  4<i className="bx bx-buoy bx-spin text-primary display-3" />3
                </h1>
                <h4>{t("403.title", { title: title || t("403.unknown") })}</h4>
                <div className="mt-5 text-center">
                  <Link className="btn btn-primary " to="/">
                    {t("403.button")}
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
};

export default NotAuthorizedView;
