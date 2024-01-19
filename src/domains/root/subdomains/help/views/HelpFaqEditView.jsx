import CardHeadContent from "@/components/Kit/CardHeadContent";
import InputGroup from "@/components/Kit/InputGroup";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import Spin from "sspin/dist/esm/Spin";
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout";

const HelpFaqEditView = () => {
    const params = useParams();
    const { data, isLoading: isDetailLoading } = useQuery(
        apiUrl(Services.Help, `/admin/faq/${params.uuid}`)
      );
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation("help");
    const navigate = useNavigate();
    const alert = useAlert();
    useMeta(t("faq.edit.title"));

    const form = useFormik({
        initialValues: {
            meta: {
                tr: {
                    title: '',
                    description: '',
                    keywords: ''
                },
                en: {title: '',
                description: '',
                keywords: ''
            }
            }
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async(values) => {
            if (
                !(await alert.check({
                  text: t("faq.edit.check"),
                }))
              )
                return;
              setLoading(true);
            const res =await httpClient.put(apiUrl(Services.Help, `/admin/faq/${params.uuid}`), values).catch(handleApiError(alert, form))
            setLoading(false);
            if (!res || ![200, 201].includes(res.status)) return;
            navigate("/help/faqs");
        }
    })

    useEffect(() => {
        if (!data) return;
        form.setValues(data);
    }, [data])

    const onSubmit = (e) => {
        e.preventDefault()
        form.submitForm();
    }

    return <ClaimGuardLayout pageName={t("faq.edit.title")}
    roles={[Roles.admin, Roles.Help.Super, Roles.Help.Faq.super, Roles.Help.Faq.update]}>
        <PageContentLayout>
        <RBreadcrumb title={t("faq.edit.title")}>
          <RBreadcrumb.Item to="/help/faqs">
            {t("faq.list.title")}
          </RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("faq.edit.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Spin loading={loading || isDetailLoading}>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col xs={12}>
                        <Card className="r-card">
                        <CardHeader>
                      <CardHeadContent
                        title={t("faq.form.meta.section.title")}
                        subtitle={t("faq.form.meta.section.subtitle")}
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        {Config.langs.map((lang, index) => <Fragment key={`${lang}trans${index}`}>
                            <Col xs={12}>
                                <h5>{t(`translate.${lang}`)}</h5>
                            </Col>
                            <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].title`}
                              label={t("faq.form.meta.title.label")}
                              error={
                                form.errors.meta &&
                                form.errors.meta[lang]?.title
                              }
                            >
                              <Input
                                id={`meta[${lang}].title`}
                                name={`meta[${lang}].title`}
                                type="text"
                                className="form-control"
                                placeholder={t("faq.form.meta.title.placeholder")}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].title}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.title
                                }
                              />
                            </InputGroup>
                            </Col>
                            <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].description`}
                              label={t("faq.form.meta.description.label")}
                              error={
                                form.errors.meta &&
                                form.errors.meta[lang]?.description
                              }
                            >
                              <Input
                                id={`meta[${lang}].description`}
                                name={`meta[${lang}].description`}
                                type="textarea"
                                className="form-control"
                                placeholder={t(
                                  "faq.form.meta.description.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].description}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.description
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].keywords`}
                              label={t("faq.form.meta.keywords.label")}
                              error={
                                form.errors.meta &&
                                form.errors.meta[lang]?.keywords
                              }
                            >
                              <Input
                                id={`meta[${lang}].keywords`}
                                name={`meta[${lang}].keywords`}
                                type="text"
                                className="form-control"
                                placeholder={t("faq.form.meta.keywords.placeholder")}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].keywords}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.keywords
                                }
                              />
                            </InputGroup>
                            </Col>
                        </Fragment>)}
                      </Row>
                    </CardBody>
                        </Card>
                    </Col>
              <Col xs="12" className="mb-4">
                <Button color="primary" type="submit">
                  {t("faq.form.submit")}
                </Button>
              </Col>
                </Row>
            </Form>
        </Spin>
        </PageContentLayout>
    </ClaimGuardLayout>
}

export {
    HelpFaqEditView as Component
};

