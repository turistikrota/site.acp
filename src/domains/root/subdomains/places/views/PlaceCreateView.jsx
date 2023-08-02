import CardHeadContent from "@/components/Kit/CardHeadContent";
import ImageUploader from "@/components/Kit/ImageUploader";
import InputGroup from "@/components/Kit/InputGroup";
import MarkdownEditor, {
  uploadMdContent,
} from "@/components/Kit/MarkdownContent";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import RCheckbox from "@/components/Kit/RCheckbox";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
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
import PageContentLayout from "~domains/root/layout/PageContentLayout";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const PlaceCreateView = () => {
  const [loading, setLoading] = useState(false);
  const { data: features, isLoading } = useQuery(
    apiUrl(Services.Place, "/feature"),
    {
      cache: true,
    }
  );
  const navigate = useNavigate();
  const alert = useAlert();
  const [trMarkdown, setTrMarkdown] = useState("");
  const [enMarkdown, setEnMarkdown] = useState("");
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation("places");
  useMeta(t("create.title"));

  const form = useFormik({
    initialValues: {
      featureUUIDs: [],
      coordinates: [0, 0],
      timeSpent: {
        min: 0,
        max: 0,
      },
      translations: Config.langs.map((l) => ({
        locale: l,
        title: "",
        description: "",
        markdownUrl: "",
        seo: {
          title: "",
          description: "",
          keywords: "",
        },
      })),
      isPayed: false,
      type: "",
    },
    onSubmit: async (values) => {
      const check = await alert.check({
        text: t("create.check"),
      });
      if (!check) return;
      setLoading(true);
      const [enContent, trContent] = await Promise.all([
        uploadMdContent(enMarkdown, Config.cdn.apps.placesMd),
        uploadMdContent(trMarkdown, Config.cdn.apps.placesMd),
      ]);
      if (!enContent || !trContent) {
        setLoading(false);
        return alert.error({
          text: t("upload.failed"),
        });
      }
      form.setFieldValue("translations[0].markdownUrl", enContent);
      form.setFieldValue("translations[1].markdownUrl", trContent);
      const res = await httpClient
        .post(apiUrl(Services.Place, "/place"), {
          featureUUIDs: values.featureUUIDs,
          images: images.map((img, indx) => ({
            url: img,
            order: indx + 1,
          })),
          coordinates: values.coordinates,
          timeSpent: values.timeSpent,
          translations: values.translations,
          isPayed: values.isPayed,
          type: values.type,
        })
        .catch(handleApiError(alert, form));
      setLoading(false);
      if (![200, 201].includes(res.status)) return;
      navigate("/places");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    form.submitForm();
  };
  return (
    <ClaimGuardLayout
      pageName={t("create.title")}
      roles={[Roles.admin, Roles.Places.any, Roles.Places.create]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("create.title")}>
          <RBreadcrumb.Item to="/places">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("create.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Spin loading={loading}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col xs="12">
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.basic.title")}
                      subtitle={t("form.basic.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Spin loading={isLoading}>
                        <Col xs="12">
                          <InputGroup
                            label={t("form.basic.featureUUIDs.label")}
                            name="featureUUIDs"
                            error={form.errors.featureUUIDs}
                          >
                            <Select
                              classNamePrefix="select2-selection"
                              placeholder={t(
                                "form.basic.featureUUIDs.placeholder"
                              )}
                              title={t("form.basic.featureUUIDs.title")}
                              options={
                                features
                                  ? features.map((d) => ({
                                      value: d.uuid,
                                      label:
                                        d.translations[i18n.language].title,
                                    }))
                                  : []
                              }
                              isMulti
                              invalid={!!form.errors.featureUUIDs}
                              onChange={(e) => {
                                form.setFieldValue(
                                  "featureUUIDs",
                                  e.map((d) => d.value)
                                );
                              }}
                              theme={makeCustomSelect}
                            />
                          </InputGroup>
                        </Col>
                      </Spin>
                      <Col xs="12">
                        <InputGroup
                          htmlFor="type"
                          label={t("form.basic.type.label")}
                          error={form.errors.type}
                        >
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder={t("form.basic.type.placeholder")}
                            title={t("form.basic.type.title")}
                            options={Config.places.types.map((d) => ({
                              value: d,
                              label: t(`form.basic.type.options.${d}`),
                            }))}
                            invalid={!!form.errors.type}
                            onChange={(e) => {
                              form.setFieldValue("type", e.value);
                            }}
                            theme={makeCustomSelect}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="12">
                        <InputGroup
                          htmlFor="isPayed"
                          label={t("form.basic.isPayed.label")}
                          error={form.errors.isPayed}
                        >
                          <RCheckbox
                            id="isPayed"
                            name="isPayed"
                            checked={form.values.isPayed}
                            onChange={(e) => {
                              form.setFieldValue("isPayed", e.target.checked);
                            }}
                          >
                            {t("form.basic.isPayed.title")}
                          </RCheckbox>
                        </InputGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.coordinates.title")}
                      subtitle={t("form.coordinates.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm="6">
                        <InputGroup
                          htmlFor={"coordinates[0]"}
                          label={t("form.coordinates.latitude")}
                          error={form.errors.latitude}
                        >
                          <Input
                            id="coordinates[0]"
                            name="coordinates[0]"
                            type="numeric"
                            className="form-control"
                            placeholder={t("form.coordinates.latitude")}
                            pattern="^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$"
                            onChange={form.handleChange}
                            max={90}
                            min={-90}
                            value={form.values.coordinates[0]}
                            invalid={!!form.errors.coordinates}
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="6">
                        <InputGroup
                          htmlFor={"coordinates[1]"}
                          label={t("form.coordinates.longitude")}
                          error={form.errors.longitude}
                        >
                          <Input
                            id="coordinates[1]"
                            name="coordinates[1]"
                            type="numeric"
                            className="form-control"
                            placeholder={t("form.coordinates.longitude")}
                            pattern="^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$"
                            onChange={form.handleChange}
                            max={180}
                            min={-180}
                            value={form.values.coordinates[1]}
                            invalid={!!form.errors.coordinates}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.timeSpent.title")}
                      subtitle={t("form.timeSpent.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm="6">
                        <InputGroup
                          htmlFor={"timeSpent.min"}
                          label={t("form.timeSpent.min")}
                          error={form.errors.timeSpent?.min}
                        >
                          <Input
                            id="timeSpent.min"
                            name="timeSpent.min"
                            type="number"
                            className="form-control"
                            placeholder={t("form.timeSpent.min")}
                            onChange={form.handleChange}
                            value={form.values.timeSpent?.min}
                            invalid={!!form.errors.timeSpent?.min}
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="6">
                        <InputGroup
                          htmlFor={"timeSpent.max"}
                          label={t("form.timeSpent.max")}
                          error={form.errors.timeSpent?.max}
                        >
                          <Input
                            id="timeSpent.max"
                            name="timeSpent.max"
                            type="number"
                            className="form-control"
                            placeholder={t("form.timeSpent.max")}
                            onChange={form.handleChange}
                            value={form.values.timeSpent?.max}
                            invalid={!!form.errors.timeSpent?.max}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Card className="r-card">
                  <CardHeader>
                    <CardHeadContent
                      title={t("form.translations.title")}
                      subtitle={t("form.translations.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      {Config.locales.map((lang, index) => (
                        <Fragment key={lang + "basic" + index}>
                          <Col xs="12">
                            <h5>{lang}</h5>
                          </Col>
                          <Col xs="12">
                            <InputGroup
                              htmlFor={`translations[${index}].title`}
                              label={t("form.translations.title-input.label")}
                              error={form.errors.translations?.[index]?.title}
                            >
                              <Input
                                id={`translations[${index}].title`}
                                name={`translations[${index}].title`}
                                type="text"
                                className="form-control"
                                placeholder={t(
                                  "form.translations.title-input.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={form.values.translations[index].title}
                                invalid={
                                  !!form.errors.translations?.[index]?.title
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="12">
                            <InputGroup
                              htmlFor={`translations[${index}].description`}
                              label={t("form.translations.description.label")}
                              error={
                                form.errors.translations?.[index]?.description
                              }
                            >
                              <Input
                                id={`translations[${index}].description`}
                                name={`translations[${index}].description`}
                                type="textarea"
                                className="form-control"
                                placeholder={t(
                                  "form.translations.description.placeholder"
                                )}
                                onChange={form.handleChange}
                                value={
                                  form.values.translations[index].description
                                }
                                invalid={
                                  !!form.errors.translations?.[index]
                                    ?.description
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="12">
                            <Row>
                              <Col xs="12" sm="6">
                                <InputGroup
                                  htmlFor={`translations[${index}].seo.title`}
                                  label={t("form.translations.seo.title")}
                                  error={
                                    form.errors.translations?.[index]?.seo
                                      ?.title
                                  }
                                >
                                  <Input
                                    id={`translations[${index}].seo.title`}
                                    name={`translations[${index}].seo.title`}
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                      "form.translations.seo.title"
                                    )}
                                    onChange={form.handleChange}
                                    value={
                                      form.values.translations[index].seo.title
                                    }
                                    invalid={
                                      !!form.errors.translations?.[index]?.seo
                                        ?.title
                                    }
                                  />
                                </InputGroup>
                              </Col>
                              <Col xs="12" sm="6">
                                <InputGroup
                                  htmlFor={`translations[${index}].seo.keywords`}
                                  label={t("form.translations.seo.keywords")}
                                  error={
                                    form.errors.translations?.[index]?.seo
                                      ?.keywords
                                  }
                                >
                                  <Input
                                    id={`translations[${index}].seo.keywords`}
                                    name={`translations[${index}].seo.keywords`}
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                      "form.translations.seo.keywords"
                                    )}
                                    onChange={form.handleChange}
                                    value={
                                      form.values.translations[index].seo
                                        .keywords
                                    }
                                    invalid={
                                      !!form.errors.translations?.[index]?.seo
                                        ?.keywords
                                    }
                                  />
                                </InputGroup>
                              </Col>
                              <Col xs="12">
                                <InputGroup
                                  htmlFor={`translations[${index}].seo.description`}
                                  label={t("form.translations.seo.description")}
                                  error={
                                    form.errors.translations?.[index]?.seo
                                      ?.description
                                  }
                                >
                                  <Input
                                    id={`translations[${index}].seo.description`}
                                    name={`translations[${index}].seo.description`}
                                    type="text"
                                    className="form-control"
                                    placeholder={t(
                                      "form.translations.seo.description"
                                    )}
                                    onChange={form.handleChange}
                                    value={
                                      form.values.translations[index].seo
                                        .description
                                    }
                                    invalid={
                                      !!form.errors.translations?.[index]?.seo
                                        ?.description
                                    }
                                  />
                                </InputGroup>
                              </Col>
                            </Row>
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
                      title={t("form.image.title")}
                      subtitle={t("form.image.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <ImageUploader
                      value={images}
                      app={Config.cdn.apps.places}
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
                        <h5 className="mb-3">English</h5>
                        <MarkdownEditor
                          value={enMarkdown}
                          onChange={(e) => setEnMarkdown(e)}
                        />
                      </Col>
                      <Col xs="12" className="mt-5">
                        <h5 className="mb-3">Türkçe</h5>
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

export { PlaceCreateView as Component };
