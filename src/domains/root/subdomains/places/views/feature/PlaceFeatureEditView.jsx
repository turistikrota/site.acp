import ContentLoader from "@/components/Kit/ContentLoader";
import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import { Roles } from "@/config/roles";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { Row } from "reactstrap";
import NotFoundView from "@/components/Kit/404";
import { Col } from "reactstrap";
import { Form } from "reactstrap";
import { Card } from "reactstrap";
import { CardHeader } from "reactstrap";
import CardHeadContent from "@/components/Kit/CardHeadContent";
import { CardBody } from "reactstrap";
import InputGroup from "@/components/Kit/InputGroup";
import { Input } from "reactstrap";
import { Button } from "reactstrap";
import { Badge } from "reactstrap";
import RenderIfClaimExists from "../../../account/components/RenderIfClaimExists";
import { CardFooter } from "reactstrap";

const PlaceFeatureEditView = () => {
  const { uuid } = useParams();
  const { data, isLoading } = useQuery(
    apiUrl(Services.Place, `/feature/${uuid}`)
  );
  const { t, i18n } = useTranslation("place-features");
  useMeta(t("edit.title"));
  const form = useFormik({
    initialValues: {
      icon: "",
      translations: {
        tr: {
          title: "",
          description: "",
        },
        en: {
          title: "",
          description: "",
        },
      },
    },
  });
  if (isLoading) return <ContentLoader />;
  if (!data) return <NotFoundView.Delayed title={`#${uuid}`} />;

  const toggleActivateStatus = () => {};

  const deleteFeature = () => {};

  return (
    <ClaimGuardLayout
      pageName={t("edit.title")}
      roles={[
        Roles.admin,
        Roles.Places.Features.all,
        Roles.Places.Features.read,
      ]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("edit.title")}>
          <RBreadcrumb.Item href="/places/features">
            {t("list.title")}
          </RBreadcrumb.Item>
        </RBreadcrumb>
        <Row>
          <Col md="6">
            #{data.uuid} - {data.translations[i18n.language].title}
          </Col>
          <Col md="6" className="d-flex justify-content-end align-items-center">
            {data.isActive ? (
              <h4>
                <Badge color="success">{t("edit.active")}</Badge>
              </h4>
            ) : (
              <h4>
                <Badge color="danger">{t("edit.inactive")}</Badge>
              </h4>
            )}
            {data.isDeleted && (
              <h4>
                <Badge color="danger">{t("edit.deleted")}</Badge>
              </h4>
            )}
          </Col>
        </Row>
        <Form className="mt-3">
          <Row>
            <Col xs="12">
              <Card className="r-card">
                <CardHeader>
                  <CardHeadContent
                    title={t("edit.basic.title")}
                    subtitle={t("edit.basic.subtitle")}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <InputGroup
                        htmlFor={"icon"}
                        label={t("edit.basic.icon.label")}
                      >
                        <Input
                          id="icon"
                          name="icon"
                          type="text"
                          className="form-control"
                          placeholder={t("edit.basic.icon.placeholder")}
                          onChange={form.handleChange}
                          value={form.values.icon}
                        ></Input>
                      </InputGroup>
                    </Col>
                    <Col md="12">
                      <div className="card-title mb-0">
                        {t("edit.basic.translations.section-title")}
                      </div>
                    </Col>
                    <Col md="12">
                      <h6 className="mt-3">
                        English
                        <span className="text-danger">*</span>
                      </h6>
                      <Row>
                        <Col md="6">
                          <InputGroup
                            htmlFor={"translations.en.title"}
                            label={t("edit.basic.translations.title.label")}
                          >
                            <Input
                              id="translations.en.title"
                              name="translations.en.title"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.title.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations.en.title}
                            />
                          </InputGroup>
                        </Col>
                        <Col md="6">
                          <InputGroup
                            htmlFor={"translations.en.description"}
                            label={t(
                              "edit.basic.translations.description.label"
                            )}
                          >
                            <Input
                              id="translations.en.description"
                              name="translations.en.description"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.description.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations.en.description}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="12">
                      <h6 className="mt-3">
                        Türkçe
                        <span className="text-danger">*</span>
                      </h6>
                      <Row>
                        <Col md="6">
                          <InputGroup
                            htmlFor={"translations.tr.title"}
                            label={t("edit.basic.translations.title.label")}
                          >
                            <Input
                              id="translations.tr.title"
                              name="translations.tr.title"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.title.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations.tr.title}
                            />
                          </InputGroup>
                        </Col>
                        <Col md="6">
                          <InputGroup
                            htmlFor={"translations.tr.description"}
                            label={t(
                              "edit.basic.translations.description.label"
                            )}
                          >
                            <Input
                              id="translations.tr.description"
                              name="translations.tr.description"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.description.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations.tr.description}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <RenderIfClaimExists
                    roles={[
                      Roles.admin,
                      Roles.Places.Features.all,
                      Roles.Places.Features.update,
                    ]}
                    fallback={
                      <Button color="primary" className="mt-3" disabled>
                        {t("edit.basic.submit")}
                      </Button>
                    }
                  >
                    <Button htmlType="submit" color="primary" className="mt-3">
                      {t("edit.basic.submit")}
                    </Button>
                  </RenderIfClaimExists>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Form>
        <Row>
          <RenderIfClaimExists
            roles={[
              Roles.admin,
              Roles.Places.Features.all,
              data.isActive
                ? Roles.Places.Features.disable
                : Roles.Places.Features.enable,
            ]}
          >
            <Col xs="12">
              <Card className="r-card">
                <CardBody>
                  <Row className="align-items-center align-middle">
                    <Col xs="6">
                      <CardHeadContent
                        title={t("edit.activate.title")}
                        subtitle={t("edit.activate.subtitle")}
                      />
                    </Col>
                    <Col
                      xs="6"
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button color="primary" onClick={toggleActivateStatus}>
                        {data.isActive
                          ? t("edit.activate.deactivate")
                          : t("edit.activate.activate")}
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </RenderIfClaimExists>
          {!data.isDeleted && (
            <RenderIfClaimExists
              roles={[
                Roles.admin,
                Roles.Places.Features.all,
                Roles.Places.Features.delete,
              ]}
            >
              <Col xs="12">
                <Card className="r-card">
                  <CardBody>
                    <Row className="align-items-center align-middle">
                      <Col xs="6">
                        <CardHeadContent
                          title={t("edit.delete.title")}
                          subtitle={t("edit.delete.subtitle")}
                        />
                      </Col>
                      <Col
                        xs="6"
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Button color="danger" onClick={deleteFeature}>
                          {t("edit.delete.delete")}
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </RenderIfClaimExists>
          )}
        </Row>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceFeatureEditView as Component };
