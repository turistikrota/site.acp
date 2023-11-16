import CardHeadContent from "@/components/Kit/CardHeadContent";
import ImageUploader from "@/components/Kit/ImageUploader";
import InputGroup from "@/components/Kit/InputGroup";
import MarkdownEditor, {
  uploadMdContent,
} from "@/components/Kit/MarkdownContent";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { makeCustomSelect } from "@/utils/customSelect";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
} from "reactstrap";
import Spin from "sspin";
import { v4 as uuidv4 } from "uuid";
import PageContentLayout from "~domains/root/layout/PageContentLayout";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import CategoryInputGroupForm from "../components/CategoryInputGroupForm";
import CategoryParentSelector from "../components/CategoryParentSelector";

const CategoryCreateView = () => {
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const { t } = useTranslation("categories");
  const [trMarkdown, setTrMarkdown] = useState("");
  const [enMarkdown, setEnMarkdown] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const alert = useAlert();
  useMeta(t("create.title"));

  const form = useFormik({
    initialValues: {
      mainUUID: undefined,
      parents: [],
      meta: {
        tr: {
          name: "",
          description: "",
          title: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
            canonical: "",
            extra: [],
          },
        },
        en: {
          name: "",
          description: "",
          title: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
            canonical: "",
            extra: [],
          },
        },
      },
      inputGroups: [],
      inputs: [],
      rules: [],
      alerts: [],
      validators: ["required"],
      order: 1,
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (
        !(await alert.check({
          text: t("create.check"),
        }))
      )
        return;
      setLoading(true);
      const lastParent = values.parents[values.parents.length - 1];
      const res = await httpClient
        .post(apiUrl(Services.Category, "/admin"), {
          mainUUID: lastParent?.uuid,
          mainUUIDs: values.parents.map((p) => p.uuid),
          meta: values.meta,
          inputGroups: values.inputGroups,
          inputs: values.inputs,
          rules: values.rules,
          alerts: values.alerts,
          validators: values.validators,
          order: values.order,
          images: images.map((img, indx) => ({
            url: img,
            order: indx + 1,
          })),
        })
        .catch(handleApiError(alert, form));
      setLoading(false);
      if (!res || ![200, 201].includes(res.status)) return;
      const uuid = res.data.uuid;
      const [enContent, trContent] = await Promise.all([
        uploadMdContent(enMarkdown, Config.cdn.apps.categoriesMd, {
          randomName: false,
          fileName: uuid + ".en",
        }),
        uploadMdContent(trMarkdown, Config.cdn.apps.categoriesMd, {
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
      navigate("/categories");
    },
  });

  const onInputGroupCreate = () => {
    form.setFieldValue("inputGroups", [
      ...form.values.inputGroups,
      {
        uuid: uuidv4(),
        icon: "",
        translations: {
          tr: {
            name: "",
            description: "",
          },
          en: {
            name: "",
            description: "",
          },
        },
      },
    ]);
  };

  const onInputGroupDelete = (index) => {
    form.setFieldValue(
      "inputGroups",
      form.values.inputGroups.filter((_, i) => i !== index)
    );
  };

  const onCreateInput = (groupUUID) => {
    form.setFieldValue("inputs", [
      ...form.values.inputs,
      {
        uuid: uuidv4(),
        groupUUID,
        type: "text",
        isRequired: false,
        isMultiple: false,
        isUnique: false,
        isPayed: false,
        extra: [],
        options: [],
        translations: {
          tr: {
            name: "",
            placeholder: "",
            help: "",
          },
          en: {
            name: "",
            placeholder: "",
            help: "",
          },
        },
      },
    ]);
  };

  const onAlertCreate = () => {
    form.setFieldValue("alerts", [
      ...form.values.alerts,
      {
        uuid: uuidv4(),
        translations: {
          tr: {
            name: "",
            description: "",
          },
          en: {
            name: "",
            description: "",
          },
        },
        type: "info",
      },
    ]);
  };

  const onRuleCreate = () => {
    form.setFieldValue("rules", [
      ...form.values.rules,
      {
        uuid: uuidv4(),
        translations: {
          tr: {
            name: "",
            description: "",
          },
          en: {
            name: "",
            description: "",
          },
        },
      },
    ]);
  };

  const onAlertDelete = (alertIndex) => {
    form.setFieldValue(
      "alerts",
      form.values.alerts.filter((_, i) => i !== alertIndex)
    );
  };

  const onRuleDelete = (ruleIndex) => {
    form.setFieldValue(
      "rules",
      form.values.rules.filter((_, i) => i !== ruleIndex)
    );
  };

  const onInputDelete = (inputUUID) => {
    form.setFieldValue(
      "inputs",
      form.values.inputs.filter((input) => input.uuid !== inputUUID)
    );
  };

  const handleCategoryChange = (category) => {
    const ids = form.values.parents.map((p) => p.uuid);
    if (ids.includes(category.value)) {
      form.setFieldValue(
        "parents",
        form.values.parents.filter((p) => p.uuid !== category.value)
      );
      return;
    }
    form.setFieldValue("parents", [
      ...form.values.parents,
      {
        uuid: category.value,
        name: category.label,
      },
    ]);
  };

  const onMainCategoryChange = (category) => {
    form.setFieldValue("parents", [
      {
        uuid: category.value,
        name: category.label,
      },
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    form.submitForm();
  };

  return (
    <ClaimGuardLayout
      pageName={t("create.title")}
      roles={[Roles.admin, Roles.Categories.any, Roles.Categories.create]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("create.title")}>
          <RBreadcrumb.Item to="/categories">
            {t("list.title")}
          </RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("create.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Spin loading={loading}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Spin loading={categoryLoading}>
                <Col xs={12}>
                  <Card className="r-card">
                    <CardHeader>
                      <CardHeadContent
                        title={t("form.parent.title")}
                        subtitle={t("form.parent.subtitle")}
                      />
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <CategoryParentSelector
                          parents={form.values.parents}
                          onChange={handleCategoryChange}
                          onMainChange={(category) => {
                            onMainCategoryChange(category);
                          }}
                          setLoading={setCategoryLoading}
                        />
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Spin>
              <Col xs={12}>
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.meta.section.title")}
                      subtitle={t("form.meta.section.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      {Config.langs.map((lang, index) => (
                        <Fragment key={lang + "trans" + index}>
                          <Col xs="12">
                            <h5>{t(`translate.${lang}`)}</h5>
                          </Col>
                          <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].name`}
                              label={t("form.meta.name.label")}
                              error={
                                form.errors.meta && form.errors.meta[lang]?.name
                              }
                            >
                              <Input
                                id={`meta[${lang}].name`}
                                name={`meta[${lang}].name`}
                                type="text"
                                className="form-control"
                                placeholder={t("form.meta.name.placeholder")}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].name}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.name
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].title`}
                              label={t("form.meta.title.label")}
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
                                placeholder={t("form.meta.title.placeholder")}
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
                              label={t("form.meta.description.label")}
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
                                  "form.meta.description.placeholder"
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
                          <Col xs={12} sm={6}>
                            <InputGroup
                              htmlFor={`meta[${lang}].seo.title`}
                              label={t("form.meta.seo.title.label")}
                              error={
                                form.errors.meta &&
                                form.errors.meta[lang]?.seo.title
                              }
                            >
                              <Input
                                id={`meta[${lang}].seo.title`}
                                name={`meta[${lang}].seo.title`}
                                type="text"
                                className="form-control"
                                placeholder={t(
                                  "form.meta.seo.title.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].seo.title}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.seo.title
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col xs={12} sm={6}>
                            <InputGroup
                              htmlFor={`meta[${lang}].seo.keywords`}
                              label={t("form.meta.seo.keywords.label")}
                              error={
                                form.errors.meta &&
                                form.errors.meta[lang]?.seo.keywords
                              }
                            >
                              <Input
                                id={`meta[${lang}].seo.keywords`}
                                name={`meta[${lang}].seo.keywords`}
                                type="text"
                                className="form-control"
                                placeholder={t(
                                  "form.meta.seo.keywords.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].seo.keywords}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.seo.keywords
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col xs={12}>
                            <InputGroup
                              htmlFor={`meta[${lang}].seo.description`}
                              label={t("form.meta.seo.description.label")}
                              error={
                                form.errors.meta &&
                                form.errors.meta[lang]?.seo.description
                              }
                            >
                              <Input
                                id={`meta[${lang}].seo.description`}
                                name={`meta[${lang}].seo.description`}
                                type="text"
                                className="form-control"
                                placeholder={t(
                                  "form.meta.seo.description.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={form.values.meta[lang].seo.description}
                                invalid={
                                  !!form.errors.meta &&
                                  !!form.errors.meta[lang]?.seo.description
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
              <Col xs={12}>
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.alerts.title")}
                      subtitle={t("form.alerts.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col
                        xs={12}
                        className="d-flex justify-content-end align-items-center mb-2"
                      >
                        <Button
                          color="info"
                          type="button"
                          onClick={() => onAlertCreate()}
                        >
                          {t("form.alerts.add")}
                        </Button>
                      </Col>
                      {form.values.alerts.map((alert, alertIndex) => (
                        <Col xs={12} key={alert.uuid + "alert" + alertIndex}>
                          <Row className="bg-third px-2 py-3 rounded-md my-2 mx-half">
                            <Col xs={12} className="mb-3">
                              <Row>
                                <Col xs={12} md={8}>
                                  {t("form.alerts.label", {
                                    index: alertIndex + 1,
                                  })}
                                </Col>
                                <Col
                                  xs={12}
                                  md={4}
                                  className="d-flex justify-content-end align-items-center"
                                >
                                  <Button
                                    size="sm"
                                    color="danger"
                                    type="button"
                                    onClick={() => onAlertDelete(alertIndex)}
                                  >
                                    {t("form.alerts.delete", {
                                      index: alertIndex + 1,
                                    })}
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                            {Config.langs.map((lang, index) => (
                              <Fragment key={lang + "alert" + index}>
                                <Col xs={12}>
                                  <h5>{t(`translate.${lang}`)}</h5>
                                </Col>
                                <Col xs={12}>
                                  <InputGroup
                                    htmlFor={`alerts[${alertIndex}].translations[${lang}].name`}
                                    label={t("form.alerts.name.label")}
                                    error={
                                      form.errors.alerts &&
                                      form.errors.alerts[alertIndex]?.name
                                    }
                                  >
                                    <Input
                                      id={`alerts[${alertIndex}].translations[${lang}].name`}
                                      name={`alerts[${alertIndex}].translations[${lang}].name`}
                                      type="text"
                                      className="form-control"
                                      placeholder={t(
                                        "form.alerts.name.placeholder"
                                      )}
                                      onChange={form.handleChange}
                                      value={
                                        form.values.alerts[alertIndex].name
                                      }
                                      invalid={
                                        !!form.errors.alerts &&
                                        !!form.errors.alerts[alertIndex]?.name
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                                <Col xs={12}>
                                  <InputGroup
                                    htmlFor={`alerts[${alertIndex}].translations[${lang}].description`}
                                    label={t("form.alerts.description.label")}
                                    error={
                                      form.errors.alerts &&
                                      form.errors.alerts[alertIndex]
                                        ?.description
                                    }
                                  >
                                    <Input
                                      id={`alerts[${alertIndex}].translations[${lang}].description`}
                                      name={`alerts[${alertIndex}].translations[${lang}].description`}
                                      type="textarea"
                                      className="form-control"
                                      placeholder={t(
                                        "form.alerts.description.placeholder"
                                      )}
                                      onChange={form.handleChange}
                                      value={
                                        form.values.alerts[alertIndex]
                                          .description
                                      }
                                      invalid={
                                        !!form.errors.alerts &&
                                        !!form.errors.alerts[alertIndex]
                                          ?.description
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                              </Fragment>
                            ))}
                            <Col xs={12}>
                              <InputGroup
                                htmlFor={`alerts[${alertIndex}].type`}
                                label={t("form.alerts.type.label")}
                                error={
                                  form.errors.alerts &&
                                  form.errors.alerts[alertIndex]?.type
                                }
                              >
                                <Select
                                  classNamePrefix="select2-selection"
                                  placeholder={t(
                                    "form.alerts.type.placeholder"
                                  )}
                                  title={t("form.alerts.type.title")}
                                  options={["info", "warning", "error"].map(
                                    (type) => ({
                                      value: type,
                                      label: t(`form.alerts.types.${type}`),
                                    })
                                  )}
                                  value={{
                                    value: form.values.alerts[alertIndex].type,
                                    label: t(
                                      `form.alerts.types.${form.values.alerts[alertIndex].type}`
                                    ),
                                  }}
                                  invalid={
                                    !!form.errors.inputs &&
                                    !!form.errors.inputs[index]?.type
                                  }
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      `alerts[${alertIndex}].type`,
                                      e.value
                                    );
                                  }}
                                  theme={makeCustomSelect}
                                />
                              </InputGroup>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12}>
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.rules.title")}
                      subtitle={t("form.rules.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col
                        xs={12}
                        className="d-flex justify-content-end align-items-center mb-2"
                      >
                        <Button
                          color="info"
                          type="button"
                          onClick={() => onRuleCreate()}
                        >
                          {t("form.rules.add")}
                        </Button>
                      </Col>
                      {form.values.rules.map((rule, ruleIndex) => (
                        <Col xs={12} key={rule.uuid + "rule" + ruleIndex}>
                          <Row className="bg-third px-2 py-3 rounded-md my-2 mx-half">
                            <Col xs={12} className="mb-3">
                              <Row>
                                <Col xs={12} md={8}>
                                  {t("form.rules.label", {
                                    index: ruleIndex + 1,
                                  })}
                                </Col>
                                <Col
                                  xs={12}
                                  md={4}
                                  className="d-flex justify-content-end align-items-center"
                                >
                                  <Button
                                    size="sm"
                                    color="danger"
                                    type="button"
                                    onClick={() => onRuleDelete(ruleIndex)}
                                  >
                                    {t("form.rules.delete", {
                                      index: ruleIndex + 1,
                                    })}
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                            {Config.langs.map((lang, index) => (
                              <Fragment key={lang + "rule" + index}>
                                <Col xs={12}>
                                  <h5>{t(`translate.${lang}`)}</h5>
                                </Col>
                                <Col xs={12}>
                                  <InputGroup
                                    htmlFor={`rules[${ruleIndex}].translations[${lang}].name`}
                                    label={t("form.rules.name.label")}
                                    error={
                                      form.errors.rules &&
                                      form.errors.rules[ruleIndex]?.name
                                    }
                                  >
                                    <Input
                                      id={`rules[${ruleIndex}].translations[${lang}].name`}
                                      name={`rules[${ruleIndex}].translations[${lang}].name`}
                                      type="text"
                                      className="form-control"
                                      placeholder={t(
                                        "form.rules.name.placeholder"
                                      )}
                                      onChange={form.handleChange}
                                      value={form.values.rules[ruleIndex].name}
                                      invalid={
                                        !!form.errors.rules &&
                                        !!form.errors.rules[ruleIndex]?.name
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                                <Col xs={12}>
                                  <InputGroup
                                    htmlFor={`rules[${ruleIndex}].translations[${lang}].description`}
                                    label={t("form.rules.description.label")}
                                    error={
                                      form.errors.rules &&
                                      form.errors.rules[ruleIndex]?.description
                                    }
                                  >
                                    <Input
                                      id={`rules[${ruleIndex}].translations[${lang}].description`}
                                      name={`rules[${ruleIndex}].translations[${lang}].description`}
                                      type="textarea"
                                      className="form-control"
                                      placeholder={t(
                                        "form.rules.description.placeholder"
                                      )}
                                      onChange={form.handleChange}
                                      value={
                                        form.values.rules[ruleIndex].description
                                      }
                                      invalid={
                                        !!form.errors.rules &&
                                        !!form.errors.rules[ruleIndex]
                                          ?.description
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                              </Fragment>
                            ))}
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12}>
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.inputs.title")}
                      subtitle={t("form.inputs.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row className="mb-3">
                      <Col
                        xs={12}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Button
                          color="info"
                          type="button"
                          onClick={() => onInputGroupCreate()}
                        >
                          {t("form.inputGroup.add")}
                        </Button>
                      </Col>
                    </Row>
                    {form.values.inputGroups.map((group, index) => (
                      <CategoryInputGroupForm
                        key={index}
                        uuid={group.uuid}
                        index={index}
                        inputs={form.values.inputs}
                        translations={group.translations}
                        icon={group.icon}
                        form={form}
                        errors={form.errors}
                        onChange={form.handleChange}
                        onDelete={() => onInputGroupDelete(index)}
                        onCreateInput={() => onCreateInput(group.uuid)}
                        onInputDelete={(inputUUID) => onInputDelete(inputUUID)}
                      />
                    ))}
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12}>
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.image.title")}
                      subtitle={t("form.image.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <ImageUploader
                      value={images}
                      app={Config.cdn.apps.categories}
                      onChange={(e) => setImages(e)}
                      randomName
                    />
                    <ImageUploader.Preview
                      files={images}
                      onRemove={(url) => {
                        setImages(images.filter((x) => x !== url));
                      }}
                      onChange={(files) => setImages(files)}
                    />
                    {form.errors && form.errors.images && (
                      <div className="text-danger">{form.errors.images}</div>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.detail.title")}
                      subtitle={t("form.detail.subtitle")}
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
                  {t("form.submit")}
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { CategoryCreateView as Component };
