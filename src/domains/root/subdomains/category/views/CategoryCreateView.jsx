import CardHeadContent from "@/components/Kit/CardHeadContent";
import InputGroup from "@/components/Kit/InputGroup";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { makeCustomSelect } from "@/utils/customSelect";
import { useFormik } from "formik";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
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

const CategoryCreateView = () => {
  const { t } = useTranslation("categories");

  const form = useFormik({
    initialValues: {
      images: [
        {
          url: "",
          order: 0,
        },
      ],
      meta: {
        tr: {
          name: "",
          description: "",
          title: "",
          markdownURL: "",
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
          markdownURL: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
            canonical: "",
            extra: [],
          },
        },
      },
      inputGroups: [
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
      ],
      inputs: [],
      rules: [
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
          strictLevel: 0, // max 10
        },
      ],
      alerts: [
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
          type: "info", // info, warning, error
        },
      ],
      validators: ["required"],
      order: 0,
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
        extra: [
          {
            name: "sss",
            value: "aaa",
          },
        ],
        options: ["aa", "bb"],
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
        strictLevel: 0,
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

  const onSubmit = () => {};
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
        <Spin loading={false}>
          <Form onSubmit={onSubmit}>
            <Row>
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
                                    htmlFor={`alerts[${alertIndex}].name`}
                                    label={t("form.alerts.name.label")}
                                    error={
                                      form.errors.alerts &&
                                      form.errors.alerts[alertIndex]?.name
                                    }
                                  >
                                    <Input
                                      id={`alerts[${alertIndex}].name`}
                                      name={`alerts[${alertIndex}].name`}
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
                                    htmlFor={`alerts[${alertIndex}].description`}
                                    label={t("form.alerts.description.label")}
                                    error={
                                      form.errors.alerts &&
                                      form.errors.alerts[alertIndex]
                                        ?.description
                                    }
                                  >
                                    <Input
                                      id={`alerts[${alertIndex}].description`}
                                      name={`alerts[${alertIndex}].description`}
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
                                    htmlFor={`rules[${ruleIndex}].name`}
                                    label={t("form.rules.name.label")}
                                    error={
                                      form.errors.rules &&
                                      form.errors.rules[ruleIndex]?.name
                                    }
                                  >
                                    <Input
                                      id={`rules[${ruleIndex}].name`}
                                      name={`rules[${ruleIndex}].name`}
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
                                    htmlFor={`rules[${ruleIndex}].description`}
                                    label={t("form.rules.description.label")}
                                    error={
                                      form.errors.rules &&
                                      form.errors.rules[ruleIndex]?.description
                                    }
                                  >
                                    <Input
                                      id={`rules[${ruleIndex}].description`}
                                      name={`rules[${ruleIndex}].description`}
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
                            <Col xs={12}>
                              <InputGroup
                                htmlFor={`rules[${ruleIndex}].strictLevel`}
                                label={t("form.rules.strictLevel.label")}
                                error={
                                  form.errors.rules &&
                                  form.errors.rules[ruleIndex]?.strictLevel
                                }
                              >
                                <Input
                                  id={`rules[${ruleIndex}].strictLevel`}
                                  name={`rules[${ruleIndex}].strictLevel`}
                                  type="number"
                                  className="form-control"
                                  placeholder={t(
                                    "form.rules.strictLevel.placeholder"
                                  )}
                                  onChange={form.handleChange}
                                  value={
                                    form.values.rules[ruleIndex].strictLevel
                                  }
                                  invalid={
                                    !!form.errors.rules &&
                                    !!form.errors.rules[ruleIndex]?.strictLevel
                                  }
                                  max={10}
                                  min={0}
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
