import React from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";

import profile from "@/assets/images/profile-img.png";
import Copyright from "@/components/Copyright/Copyright";
import Logo from "@/components/Logo/Logo";
import { useMeta } from "@/utils/site";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useAuthSchema } from "../schema/auth.schema";

const LoginView = () => {
  const { t } = useTranslation("auth");
  useMeta(t("login.pageTitle"));
  const dispatch = useDispatch();
  const authSchema = useAuthSchema();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "admin@themesbrand.com" || "",
      password: "123456" || "",
    },
    validationSchema: authSchema.login,
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  return (
    <>
      <Card className="overflow-hidden">
        <div className="bg-night bg-soft">
          <Row>
            <Col xs={7}>
              <div className="text-primary p-4">
                <h5 className="text-primary">{t("login.title")}</h5>
                <p className="text-gray">{t("login.subtitle")}</p>
              </div>
            </Col>
            <Col className="col-5 align-self-end">
              <img src={profile} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <div>
            <Link to="/" className="auth-logo-light">
              <div className="-mt-4 mb-4 w-fit">
                <Logo />
              </div>
            </Link>
          </div>
          <div className="p-2">
            <Form
              className="form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              {error ? <Alert color="danger">{error}</Alert> : null}

              <div className="mb-3">
                <Label className="form-label">{t("login.labels.email")}</Label>
                <Input
                  name="email"
                  className="form-control"
                  placeholder={t("login.placeholders.email")}
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  {t("login.labels.password")}
                </Label>
                <Input
                  name="password"
                  value={validation.values.password || ""}
                  type="password"
                  placeholder={t("login.placeholders.password")}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />
                {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mt-3 d-grid">
                <button className="btn btn-primary btn-block" type="submit">
                  {t("login.buttons.login")}
                </button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
      <Copyright />
    </>
  );
};

export { LoginView as Component };
