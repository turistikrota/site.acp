import NotFoundView from "@/components/Kit/404";
import CardHeadContent from "@/components/Kit/CardHeadContent";
import ContentLoader from "@/components/Kit/ContentLoader";
import InputGroup from "@/components/Kit/InputGroup";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import RenderIfClaimExists from "~subdomains/account/components/RenderIfClaimExists";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const PlaceFeatureEditView = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    apiUrl(Services.Place, `/feature/${uuid}`)
  );
  const alert = useAlert();
  const { t, i18n } = useTranslation("place-features");
  useMeta(t("edit.title"));
  const form = useFormik({
    initialValues: {
      icon: "",
      translations: [
        {
          locale: "en",
          title: "",
          description: "",
        },
        {
          locale: "tr",
          title: "",
          description: "",
        },
      ],
    },
    validationSchema: Yup.object().shape({
      icon: Yup.string().required(t("edit.basic.icon.required")),
      translations: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required(
            t("edit.basic.translations.title.required")
          ),
          description: Yup.string().required(
            t("edit.basic.translations.description.required")
          ),
        })
      ),
    }),
    onSubmit: async (values) => {
      const check = await alert.check({
        text: t("edit.check"),
      });
      if (!check) return;
      const res = await httpClient
        .put(apiUrl(Services.Place, `/feature/${uuid}`), values)
        .catch(handleApiError(alert, form));
      if (res.status !== 200) return;
      window.location.reload();
    },
  });

  useEffect(() => {
    if (!data) return;
    form.setValues({
      icon: data.icon,
      translations: Object.entries(data.translations).map(
        ([locale, content]) => ({
          locale,
          title: content.title,
          description: content.description,
        })
      ),
    });
  }, [data]);

  if (isLoading) return <ContentLoader />;
  if (!data) return <NotFoundView.Delayed title={`#${uuid}`} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.handleSubmit();
  };

  const toggleActivateStatus = async () => {
    const check = await alert.check({
      text: t(
        `edit.activate.check${data.isActive ? "Deactivate" : "Activate"}`
      ),
    });
    if (!check) return;
    const res = await httpClient
      .put(
        apiUrl(
          Services.Place,
          `/feature/${uuid}/${data.isActive ? "disable" : "enable"}`
        )
      )
      .catch(handleApiError(alert));
    if (res.status !== 200) return alert.error({ text: res.data?.message });
    window.location.reload();
  };

  const deleteFeature = async () => {
    const check = await alert.check({
      text: t("edit.delete.check"),
    });
    if (!check) return;
    const res = await httpClient
      .delete(apiUrl(Services.Place, `/feature/${uuid}`))
      .catch(handleApiError(alert));
    if (res.status !== 200) return alert.error({ text: res.data?.message });
    navigate("/places/features");
  };

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
          <Col
            md="6"
            className="d-flex justify-content-end align-items-center gap-2"
          >
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
        <Form className="mt-3" onSubmit={handleSubmit}>
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
                        error={form.errors.icon}
                      >
                        <Input
                          id="icon"
                          name="icon"
                          type="text"
                          className="form-control"
                          placeholder={t("edit.basic.icon.placeholder")}
                          onChange={form.handleChange}
                          value={form.values.icon}
                          invalid={!!form.errors.icon}
                        ></Input>
                        {!!form.values.icon && (
                          <div className="d-flex align-items-center mt-2">
                            <span className="text-muted">
                              {t("create.basic.icon.preview")}:
                            </span>

                            <i className={`${form.values.icon} bx-sm`} />
                          </div>
                        )}
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
                            htmlFor={"translations[0].title"}
                            label={t("edit.basic.translations.title.label")}
                            error={form.errors.translations?.[0]?.title}
                          >
                            <Input
                              id="translations[0].title"
                              name="translations[0].title"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.title.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations[0].title}
                              invalid={!!form.errors.translations?.[0]?.title}
                            />
                          </InputGroup>
                        </Col>
                        <Col md="6">
                          <InputGroup
                            htmlFor={"translations[0].description"}
                            label={t(
                              "edit.basic.translations.description.label"
                            )}
                            error={form.errors.translations?.[0]?.description}
                          >
                            <Input
                              id="translations[0].description"
                              name="translations[0].description"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.description.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations[0].description}
                              invalid={
                                !!form.errors.translations?.[0]?.description
                              }
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
                            htmlFor={"translations[1].title"}
                            label={t("edit.basic.translations.title.label")}
                            error={form.errors.translations?.[1]?.title}
                          >
                            <Input
                              id="translations[1].title"
                              name="translations[1].title"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.title.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations[1].title}
                              invalid={!!form.errors.translations?.[1]?.title}
                            />
                          </InputGroup>
                        </Col>
                        <Col md="6">
                          <InputGroup
                            htmlFor={"translations[1].description"}
                            label={t(
                              "edit.basic.translations.description.label"
                            )}
                            error={form.errors.translations?.[1]?.description}
                          >
                            <Input
                              id="translations[1].description"
                              name="translations[1].description"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "edit.basic.translations.description.placeholder"
                              )}
                              onChange={form.handleChange}
                              value={form.values.translations[1].description}
                              invalid={
                                !!form.errors.translations?.[1]?.description
                              }
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
                    <Button type="submit" color="primary" className="mt-3">
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
