import CardHeadContent from "@/components/Kit/CardHeadContent";
import InputGroup from "@/components/Kit/InputGroup";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
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
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const PlaceFeatureCreateView = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { t } = useTranslation("place-features");
  useMeta(t("create.title"));
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
      icon: Yup.string().required(t("create.basic.icon.required")),
      translations: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required(
            t("create.basic.translations.title.required")
          ),
          description: Yup.string().required(
            t("create.basic.translations.description.required")
          ),
        })
      ),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const check = await alert.check({
        text: t("create.check"),
      });
      if (!check) return;
      const res = await httpClient
        .post(apiUrl(Services.Place, "/feature"), values)
        .catch(handleApiError(alert, form));
      if (res.status !== 201) return;
      navigate("/places/features");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <ClaimGuardLayout
      pageName={t("create.title")}
      roles={[
        Roles.admin,
        Roles.Places.Features.all,
        Roles.Places.Features.create,
      ]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("create.title")}>
          <RBreadcrumb.Item href="/places/features">
            {t("list.title")}
          </RBreadcrumb.Item>
        </RBreadcrumb>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Row>
            <Col xs="12">
              <Card className="r-card">
                <CardHeader>
                  <CardHeadContent
                    title={t("create.basic.title")}
                    subtitle={t("create.basic.subtitle")}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <InputGroup
                        htmlFor={"icon"}
                        label={t("create.basic.icon.label")}
                        error={form.errors.icon}
                      >
                        <Input
                          id="icon"
                          name="icon"
                          type="text"
                          className="form-control"
                          placeholder={t("create.basic.icon.placeholder")}
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
                        {t("create.basic.translations.section-title")}
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
                            label={t("create.basic.translations.title.label")}
                            error={form.errors.translations?.[0]?.title}
                          >
                            <Input
                              id="translations[0].title"
                              name="translations[0].title"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "create.basic.translations.title.placeholder"
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
                              "create.basic.translations.description.label"
                            )}
                            error={form.errors.translations?.[0]?.description}
                          >
                            <Input
                              id="translations[0].description"
                              name="translations[0].description"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "create.basic.translations.description.placeholder"
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
                            label={t("create.basic.translations.title.label")}
                            error={form.errors.translations?.[1]?.title}
                          >
                            <Input
                              id="translations[1].title"
                              name="translations[1].title"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "create.basic.translations.title.placeholder"
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
                              "create.basic.translations.description.label"
                            )}
                            error={form.errors.translations?.[1]?.description}
                          >
                            <Input
                              id="translations[1].description"
                              name="translations[1].description"
                              type="text"
                              className="form-control"
                              placeholder={t(
                                "create.basic.translations.description.placeholder"
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
                  <Button type="submit" color="primary" className="mt-3">
                    {t("create.basic.submit")}
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Form>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceFeatureCreateView as Component };
