import CardHeadContent from "@/components/Kit/CardHeadContent";
import ImageUploader from "@/components/Kit/ImageUploader";
import InputGroup from "@/components/Kit/InputGroup";
import MarkdownEditor, {
  uploadMdContent,
  useMdContent,
} from "@/components/Kit/MarkdownContent";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import RCheckbox from "@/components/Kit/RCheckbox";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { makeCustomSelect } from "@/utils/customSelect";
import { useMeta } from "@/utils/site";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
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
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import PlaceDisableForm from "../components/PlaceDisableForm";
import PlaceEnableForm from "../components/PlaceEnableForm";

const PlaceEditView = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const { data, isLoading: isDetailLoading } = useQuery(
    apiUrl(Services.Place, `/place/${params.uuid}`),
    {
      cache: false,
    }
  );
  const { data: features, isLoading } = useQuery(
    apiUrl(Services.Place, "/feature"),
    {
      cache: true,
    }
  );
  const navigate = useNavigate();
  const alert = useAlert();
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation("places");
  useMeta(t("edit.title"));
  const translationObject = !data
    ? null
    : data.translations[i18n.language]
    ? data.translations[i18n.language]
    : data.translations[Object.keys(data.translations)[0]];

  const form = useFormik({
    initialValues: {
      defaultFeatures: undefined,
      featureUUIDs: [],
      coordinates: [0, 0],
      timeSpent: {
        min: 0,
        max: 0,
      },
      restorations: [],
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
        text: t("edit.check"),
      });
      if (!check) return;
      setLoading(true);
      const res = await httpClient
        .put(
          apiUrl(Services.Place, `/place/${params.uuid}`),
          {
            featureUUIDs: values.featureUUIDs,
            images: images.map((img, indx) => ({
              url: img,
              order: indx + 1,
            })),
            restorations: values.restorations,
            coordinates: values.coordinates.map((c) => parseFloat(c)),
            timeSpent: values.timeSpent,
            translations: values.translations,
            isPayed: values.isPayed,
            type: values.type,
          },
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        )
        .catch(handleApiError(alert, form));
      setLoading(false);
      if (![200, 201].includes(res.status)) return;
      const uuid = params.uuid;
      const [enContent, trContent] = await Promise.all([
        uploadMdContent(enMarkdown, Config.cdn.apps.placesMd, {
          randomName: false,
          fileName: uuid + ".en",
        }),
        uploadMdContent(trMarkdown, Config.cdn.apps.placesMd, {
          randomName: false,
          fileName: uuid + ".tr",
        }),
      ]);
      if (!enContent || !trContent) {
        setLoading(false);
        return alert.error({
          text: t("upload.failed"),
        });
      }
      navigate("/places");
    },
  });
  const [trMarkdown, setTrMarkdown] = useMdContent(
    form.values.translations[1].markdownUrl
  );
  const [enMarkdown, setEnMarkdown] = useMdContent(
    form.values.translations[0].markdownUrl
  );

  const addRestoration = () => {
    form.setFieldValue("restorations", [
      ...form.values.restorations,
      {
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const removeRestoration = (index) => {
    form.setFieldValue("restorations", [
      ...form.values.restorations.filter((_, i) => i !== index),
    ]);
  };

  useEffect(() => {
    if (!data) return;
    const fixedTranslations = [];
    Config.langs.forEach((l) => {
      console.log("data.translations[l]", data.translations[l]);
      const translation = data.translations[l];
      if (!translation) {
        fixedTranslations.push({
          locale: l,
          title: "",
          description: "",
          markdownUrl: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
          },
        });
      } else {
        if (!translation.locale) {
          translation.locale = l;
        }
        fixedTranslations.push(translation);
      }
    });
    form.setFieldValue(
      "defaultFeatures",
      data.features.map((d) => ({
        label: d.translations[i18n.language].title,
        value: d.uuid,
      }))
    );
    form.setFieldValue("translations", fixedTranslations);
    form.setFieldValue("type", data.type);
    form.setFieldValue("isPayed", data.isPayed);
    form.setFieldValue("coordinates", data.coordinates);
    const empty = dayjs("0001-01-01T00:00:00Z");
    form.setFieldValue(
      "restorations",
      data.restorations.map((r) => {
        let endDate = dayjs(r.endDate).format("YYYY-MM-DD");
        if (empty.format("YYYY-MM-DD") === endDate) {
          endDate = undefined;
        }
        return {
          startDate: dayjs(r.startDate).format("YYYY-MM-DD"),
          endDate,
        };
      })
    );
    form.setFieldValue("timeSpent", data.averageTimeSpent);
    form.setFieldValue(
      "featureUUIDs",
      data.features.map((d) => d.uuid)
    );
    setImages(data.images.sort((a, b) => a.order - b.order).map((d) => d.url));
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    form.submitForm();
  };

  return (
    <ClaimGuardLayout
      pageName={t("edit.title")}
      roles={[Roles.admin, Roles.Places.any, Roles.Places.update]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("edit.title")}>
          <RBreadcrumb.Item to="/places">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>
            {!data ? t("edit.title") : translationObject.title}
          </RBreadcrumb.Current>
        </RBreadcrumb>
        {data && (
          <>
            {data.isActive && <PlaceDisableForm id={params.uuid} />}
            {!data.isActive && <PlaceEnableForm id={params.uuid} />}
          </>
        )}
        <Spin loading={loading || isDetailLoading}>
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
                            htmlFor="featureUUIDs"
                            error={form.errors.featureuuids}
                          >
                            <Select
                              classNamePrefix="select2-selection"
                              placeholder={t(
                                "form.basic.featureUUIDs.placeholder"
                              )}
                              className={
                                form.errors.featureuuids ? "is-invalid" : ""
                              }
                              id="featureUUIDs"
                              name="featureUUIDs"
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
                              value={form.values.defaultFeatures}
                              isMulti
                              invalid={!!form.errors.featureuuids}
                              aria-invalid={!!form.errors.featureuuids}
                              aria-errormessage={form.errors.featureuuids}
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
                            id="type"
                            name="type"
                            value={{
                              value: form.values.type,
                              label: t(
                                `form.basic.type.options.${form.values.type}`
                              ),
                            }}
                            className={form.errors.type ? "is-invalid" : ""}
                            invalid={!!form.errors.type}
                            aria-invalid={!!form.errors.type}
                            aria-errormessage={form.errors.type}
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
                            value={form.values.isPayed}
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
                          error={form.errors.timespent?.min}
                        >
                          <Input
                            id="timeSpent.min"
                            name="timeSpent.min"
                            type="number"
                            className="form-control"
                            placeholder={t("form.timeSpent.min")}
                            onChange={form.handleChange}
                            value={form.values.timeSpent?.min}
                            invalid={!!form.errors.timespent?.min}
                          />
                        </InputGroup>
                      </Col>
                      <Col sm="6">
                        <InputGroup
                          htmlFor={"timeSpent.max"}
                          label={t("form.timeSpent.max")}
                          error={form.errors.timespent?.max}
                        >
                          <Input
                            id="timeSpent.max"
                            name="timeSpent.max"
                            type="number"
                            className="form-control"
                            placeholder={t("form.timeSpent.max")}
                            onChange={form.handleChange}
                            value={form.values.timeSpent?.max}
                            invalid={!!form.errors.timespent?.max}
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
                      title={t("form.restoration.title")}
                      subtitle={t("form.restoration.subtitle")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col
                        sm="12"
                        className="d-flex justify-content-end align-items-center mb-3"
                      >
                        <Button type="button" onClick={addRestoration}>
                          <i className="fa fa-plus"></i>
                          {t("form.restoration.add")}
                        </Button>
                      </Col>
                      {form.values.restorations.map((r, index) => (
                        <Col
                          xs={12}
                          className="d-flex align-items-center bg-third py-2 rounded-md mb-3"
                          key={index + "restoration"}
                        >
                          <Row className="w-full">
                            <Col xs={12} className="mb-1">
                              {t("form.restoration.label", {
                                index: index + 1,
                              })}
                            </Col>
                            <Col xs="6">
                              <InputGroup
                                htmlFor={`restorations[${index}].startDate`}
                                label={t("form.restoration.startDate.label")}
                                error={
                                  form.errors.restorations &&
                                  form.errors.restorations[index]?.startdate
                                }
                              >
                                <Input
                                  id={`restorations[${index}].startDate`}
                                  name={`restorations[${index}].startDate`}
                                  type="date"
                                  className="form-control"
                                  placeholder={t(
                                    "form.restoration.startDate.placeholder"
                                  )}
                                  onChange={form.handleChange}
                                  value={
                                    form.values.restorations[index].startDate
                                  }
                                  invalid={
                                    !!form.errors.restorations?.[index]
                                      ?.startdate
                                  }
                                />
                              </InputGroup>
                            </Col>
                            <Col xs="6">
                              <InputGroup
                                htmlFor={`restorations[${index}].endDate`}
                                label={t("form.restoration.endDate.label")}
                                error={
                                  form.errors.restorations &&
                                  form.errors.restorations[index]?.enddate
                                }
                              >
                                <Input
                                  id={`restorations[${index}].endDate`}
                                  name={`restorations[${index}].endDate`}
                                  type="date"
                                  className="form-control"
                                  placeholder={t(
                                    "form.restoration.endDate.placeholder"
                                  )}
                                  onChange={form.handleChange}
                                  value={
                                    form.values.restorations[index].endDate
                                  }
                                  invalid={
                                    !!form.errors.restorations?.[index]?.enddate
                                  }
                                />
                              </InputGroup>
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-center align-items-end ml-4">
                            <Button
                              type="button"
                              color="danger"
                              size="md"
                              onClick={() => removeRestoration(index)}
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12">
                <Spin loading={imageLoading}>
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
                        invalid={!!form.errors.images}
                        error={form.errors.images}
                        setLoading={setImageLoading}
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
                </Spin>
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

export { PlaceEditView as Component };
