import CardHeadContent from "@/components/Kit/CardHeadContent";
import InputGroup from "@/components/Kit/InputGroup";
import MarkdownEditor, {
  uploadMdContent,
} from "@/components/Kit/MarkdownContent";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { makeCustomSelect } from "@/utils/customSelect";
import { getTranslation } from "@/utils/i18n";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import Spin from "sspin/dist/esm/Spin";
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout";

const HelpArticleCreateView = () => {
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation("help");
  const [trMarkdown, setTrMarkdown] = useState("");
  const [enMarkdown, setEnMarkdown] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();
  const { data: categories, isLoading : categoryLoading } = useQuery(
    apiUrl(
      Services.Help,
      `/admin/category`
    )
  );
  useMeta(t("article.create.title"));

  const form = useFormik({
    initialValues: {
      categoryId: "",
      meta: {
        tr: {
          title: "",
          keywords: "",
        },
        en: { title: "", keywords: "" },
      },
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (
        !(await alert.check({
          text: t("article.create.check"),
        }))
      )
        return;
      setLoading(true);
      const res = await httpClient
        .post(apiUrl(Services.Help, `/admin/article`), values)
        .catch(handleApiError(alert, form));
      setLoading(false);
      if (!res || ![200, 201].includes(res.status)) return;
      const uuid = res.data.uuid;
      const [enContent, trContent] = await Promise.all([
        uploadMdContent(enMarkdown, Config.cdn.apps.help, {
          randomName: false,
          fileName: uuid + ".en",
        }),
        uploadMdContent(trMarkdown, Config.cdn.apps.help, {
          randomName: false,
          fileName: uuid + ".tr",
        }),
      ]);
      setLoading(false);
      if (!enContent || !trContent) {
        return alert.error({
          text: t("upload.failed"),
        });
      }
      navigate("/help");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    form.submitForm();
  };

  return (
    <ClaimGuardLayout
      pageName={t("article.create.title")}
      roles={[
        Roles.admin,
        Roles.Help.Super,
        Roles.Help.Article.super,
        Roles.Help.Article.create,
      ]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("article.create.title")}>
          <RBreadcrumb.Item to="/help">
            {t("article.list.title")}
          </RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("article.create.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Spin loading={loading || categoryLoading}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col xs={12}>
                <Card className="r-card">
                <CardHeader>
                    <CardHeadContent
                      title={t("article.form.category.title")}
                      subtitle={t("article.form.category.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                  <InputGroup
                          htmlFor="type"
                          label={t("article.form.category.label")}
                          error={form.errors.type}
                        >
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder={t("article.form.category.placeholder")}
                            title={t("article.form.category.selectTitle")}
                            options={(categories || []).map((d) => ({
                              value: d.uuid,
                              label: getTranslation(d.meta, i18n.language, {title:''}).title,
                            }))}
                            id="categoryId"
                            name="categoryId"
                            className={form.errors.categoryId ? "is-invalid" : ""}
                            invalid={!!form.errors.categoryId}
                            aria-invalid={!!form.errors.categoryId}
                            aria-errormessage={form.errors.categoryId}
                            onChange={(e) => {
                              form.setFieldValue("categoryId", e.value);
                            }}
                            theme={makeCustomSelect}
                          />
                        </InputGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12}>
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("article.form.meta.section.title")}
                      subtitle={t("article.form.meta.section.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      {Config.langs.map((lang, index) => (
                        <Fragment key={`${lang}trans${index}`}>
                          <Col xs={12}>
                            <h5>{t(`translate.${lang}`)}</h5>
                          </Col>
                          <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].title`}
                              label={t("article.form.meta.title.label")}
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
                                placeholder={t(
                                  "article.form.meta.title.placeholder"
                                )}
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
                              htmlFor={`meta[${lang}].keywords`}
                              label={t("article.form.meta.keywords.label")}
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
                                placeholder={t(
                                  "article.form.meta.keywords.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].keywords}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.keywords
                                }
                              />
                            </InputGroup>
                          </Col>
                        </Fragment>
                      ))}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("article.form.detail.title")}
                      subtitle={t("article.form.detail.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12">
                        <h5 className="mb-3">{t("translate.en")}</h5>
                        <MarkdownEditor
                          value={enMarkdown}
                          onChange={(e) => setEnMarkdown(e)}
                        />
                      </Col>
                      <Col xs="12" className="mt-5">
                        <h5 className="mb-3">{t("translate.tr")}</h5>
                        <MarkdownEditor
                          value={trMarkdown}
                          onChange={(e) => setTrMarkdown(e)}
                        />
                      </Col>
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
  );
};

export { HelpArticleCreateView as Component };
