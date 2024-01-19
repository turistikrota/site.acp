import CardHeadContent from "@/components/Kit/CardHeadContent";
import InputGroup from "@/components/Kit/InputGroup";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import Spin from "sspin/dist/esm/Spin";
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout";

const HelpCategoryCreateView = () => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation("help");
    const navigate = useNavigate();
    const alert = useAlert();
    useMeta(t("category.create.title"));

    const form = useFormik({
        initialValues: {
            meta: {
                tr: {
                    title: '',
                },
                en: {title: '',
            }
            }
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async(values) => {
            if (
                !(await alert.check({
                  text: t("category.create.check"),
                }))
              )
                return;
              setLoading(true);
            const res =await httpClient.post(apiUrl(Services.Help, `/admin/category`), values).catch(handleApiError(alert, form))
            setLoading(false);
            if (!res || ![200, 201].includes(res.status)) return;
            navigate("/help/categories");
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        form.submitForm();
    }

    return <ClaimGuardLayout pageName={t("category.create.title")}
    roles={[Roles.admin, Roles.Help.Super, Roles.Help.Faq.super, Roles.Help.Faq.create]}>
        <PageContentLayout>
        <RBreadcrumb title={t("category.create.title")}>
          <RBreadcrumb.Item to="/help/categories">
            {t("category.list.title")}
          </RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("category.create.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Spin loading={loading}>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col xs={12}>
                        <Card className="r-card">
                        <CardHeader>
                      <CardHeadContent
                        title={t("category.form.meta.section.title")}
                        subtitle={t("category.form.meta.section.subtitle")}
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
                              label={t("category.form.meta.title.label")}
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
                                placeholder={t("category.form.meta.title.placeholder")}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].title}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.title
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
                  {t("category.form.submit")}
                </Button>
              </Col>
                </Row>
            </Form>
        </Spin>
        </PageContentLayout>
    </ClaimGuardLayout>
}

export {
    HelpCategoryCreateView as Component
};

