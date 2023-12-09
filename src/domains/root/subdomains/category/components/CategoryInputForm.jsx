import InputGroup from "@/components/Kit/InputGroup";
import RCheckbox from "@/components/Kit/RCheckbox";
import { Config } from "@/config/config";
import { makeCustomSelect } from "@/utils/customSelect";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Button, Card, Col, Input, Row } from "reactstrap";

const InputTypes = [
  "text",
  "textarea",
  "number",
  "select",
  "radio",
  "checkbox",
  "date",
  "time",
  "datetime",
  "file",
  "image",
  "pdf",
  "range",
  "color",
  "url",
  "email",
  "tel",
  "location",
  "price",
  "rating",
];

const MultiableTypes = ["select", "radio", "checkbox"];

const CategoryInputForm = ({
  index,
  groupIndex,
  type,
  translations,
  isRequired,
  isMultiple,
  isUnique,
  isPayed,
  extra,
  errors,
  form,
  options,
  onChange,
  onDelete,
}) => {
  const { t } = useTranslation("categories");

  const addOption = () => {
    form.setFieldValue(`inputs[${index}].options`, [
      ...form.values.inputs[index].options,
      "",
    ]);
  };

  const addExtra = () => {
    form.setFieldValue(`inputs[${index}].extra`, [
      ...form.values.inputs[index].extra,
      {
        name: "",
        value: "",
      },
    ]);
  };

  const removeOption = (optionIndex) => {
    form.setFieldValue(
      `inputs[${index}].options`,
      form.values.inputs[index].options.filter((_, i) => i !== optionIndex)
    );
  };

  const removeExtra = (extraIndex) => {
    form.setFieldValue(
      `inputs[${index}].extra`,
      form.values.inputs[index].extra.filter((_, i) => i !== extraIndex)
    );
  };

  return (
    <Card className="rounded p-3 ml-2 my-2">
      <Row>
        <Col xs={12} className="mb-3">
          <Row>
            <Col xs={12} md={8}>
              {t("form.inputs.label", { index: groupIndex + 1 })}
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
                onClick={() => onDelete()}
              >
                {t("form.inputs.delete", {
                  index: groupIndex + 1,
                })}
              </Button>
            </Col>
          </Row>
        </Col>
        {Config.langs.map((lang, idx) => (
          <Fragment key={lang + "trans" + idx}>
            <Col xs="12">
              <h5>{t(`translate.${lang}`)}</h5>
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                  <InputGroup
                    htmlFor={`inputs[${index}].translations[${lang}].name`}
                    label={t("form.inputs.name")}
                    error={
                      errors.inputs
                        ? errors.inputs[index]?.translations[lang]?.name
                        : null
                    }
                  >
                    <Input
                      id={`inputs[${index}].translations[${lang}].name`}
                      name={`inputs[${index}].translations[${lang}].name`}
                      className="form-control"
                      placeholder={t("form.inputs.name")}
                      onChange={onChange}
                      value={translations?.[lang]?.name}
                      invalid={
                        !!errors.inputs &&
                        !!errors.inputs[index]?.translations[lang]?.name
                      }
                    />
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <InputGroup
                    htmlFor={`inputs[${index}].translations[${lang}].placeholder`}
                    label={t("form.inputs.placeholder")}
                    error={
                      errors.inputs &&
                      errors.inputs[index]?.translations[lang]?.placeholder
                    }
                  >
                    <Input
                      id={`inputs[${index}].translations[${lang}].placeholder`}
                      name={`inputs[${index}].translations[${lang}].placeholder`}
                      className="form-control"
                      placeholder={t("form.inputs.placeholder")}
                      onChange={onChange}
                      value={translations?.[lang]?.placeholder}
                      invalid={
                        !!errors.inputs &&
                        !!errors.inputs[index]?.translations[lang]?.placeholder
                      }
                    />
                  </InputGroup>
                </Col>
                <Col xs={12}>
                  <InputGroup
                    htmlFor={`inputs[${index}].translations[${lang}].help`}
                    label={t("form.inputs.help")}
                    error={
                      errors.inputs &&
                      errors.inputs[index]?.translations[lang]?.help
                    }
                  >
                    <Input
                      id={`inputs[${index}].translations[${lang}].help`}
                      name={`inputs[${index}].translations[${lang}].help`}
                      className="form-control"
                      placeholder={t("form.inputs.help")}
                      onChange={onChange}
                      value={translations?.[lang]?.help}
                      invalid={
                        !!errors.inputs &&
                        !!errors.inputs[index]?.translations[lang]?.help
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Fragment>
        ))}

        <Col xs={12} className="mt-3">
          <InputGroup
            htmlFor={`inputs[${index}].type`}
            label={t("form.inputs.type.label")}
            error={errors.inputs && errors.inputs[index]?.type}
          >
            <Select
              classNamePrefix="select2-selection"
              placeholder={t("form.inputs.type.placeholder")}
              title={t("form.inputs.type.title")}
              options={InputTypes.map((type) => ({
                value: type,
                label: t(`form.inputs.types.${type}`),
              }))}
              value={{
                value: type,
                label: t(`form.inputs.types.${type}`),
              }}
              invalid={!!errors.inputs && !!errors.inputs[index]?.type}
              onChange={(e) => {
                form.setFieldValue(`inputs[${index}].type`, e.value);
              }}
              theme={makeCustomSelect}
            />
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-2">
          <Row>
            <Col xs={12} md={8} className="mb-2">
              {t("form.inputs.options.title")}
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-end align-items-center mb-2"
            >
              <Button
                size="sm"
                color="info"
                type="button"
                onClick={() => addOption()}
              >
                {t("form.inputs.options.add")}
              </Button>
            </Col>
            {options.map((option, optIndex) => (
              <Col
                key={optIndex}
                xs={12}
                className="d-flex justify-between align-items-center"
              >
                <Row className="w-full">
                  <Col xs={12}>
                    <InputGroup
                      htmlFor={`inputs[${index}].options[${optIndex}]`}
                      label={t("form.inputs.options.label", {
                        index: optIndex + 1,
                      })}
                      error={
                        !!errors.inputs &&
                        !!errors.inputs[index]?.options &&
                        !!errors.inputs[index]?.options[optIndex]
                          ? errors.inputs[index].options[optIndex]
                          : null
                      }
                    >
                      <Input
                        id={`inputs[${index}].options[${optIndex}]`}
                        name={`inputs[${index}].options[${optIndex}]`}
                        className="form-control"
                        placeholder={t("form.inputs.options.label", {
                          index: optIndex + 1,
                        })}
                        onChange={onChange}
                        value={option}
                        invalid={
                          !!errors.inputs &&
                          !!errors.inputs[index]?.options &&
                          !!errors.inputs[index]?.options[optIndex]
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>{" "}
                <Button
                  size="sm"
                  color="danger"
                  type="button"
                  className="mt-2 ml-4"
                  onClick={() => removeOption(optIndex)}
                >
                  <i className="bx bx-xs bx-trash"></i>
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} className="mt-2">
          <Row>
            <Col xs={12} md={8} className="mb-2">
              {t("form.inputs.extra.title")}
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-end align-items-center mb-2"
            >
              <Button
                size="sm"
                color="info"
                type="button"
                onClick={() => addExtra()}
              >
                {t("form.inputs.extra.add")}
              </Button>
            </Col>
            {extra.map((ext, extIndex) => (
              <Col
                key={extIndex}
                xs={12}
                className="d-flex justify-between align-items-center"
              >
                <Row className="w-full">
                  <Col xs={6}>
                    <InputGroup
                      htmlFor={`inputs[${index}].extra[${extIndex}].name`}
                      label={t("form.inputs.extra.name", {
                        index: extIndex + 1,
                      })}
                      error={
                        !!errors.inputs &&
                        !!errors.inputs[index]?.extra &&
                        !!errors.inputs[index]?.extra[extIndex]
                          ? errors.inputs[index].extra[extIndex].name
                          : null
                      }
                    >
                      <Input
                        id={`inputs[${index}].extra[${extIndex}].name`}
                        name={`inputs[${index}].extra[${extIndex}].name`}
                        className="form-control"
                        placeholder={t("form.inputs.extra.name", {
                          index: extIndex + 1,
                        })}
                        onChange={onChange}
                        value={ext.name}
                        invalid={
                          !!errors.inputs &&
                          !!errors.inputs[index]?.extra &&
                          !!errors.inputs[index]?.extra[extIndex].name
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={6}>
                    <InputGroup
                      htmlFor={`inputs[${index}].extra[${extIndex}].value`}
                      label={t("form.inputs.extra.value", {
                        index: extIndex + 1,
                      })}
                      error={
                        !!errors.inputs &&
                        !!errors.inputs[index]?.extra &&
                        !!errors.inputs[index]?.extra[extIndex]
                          ? errors.inputs[index].extra[extIndex].value
                          : null
                      }
                    >
                      <Input
                        id={`inputs[${index}].extra[${extIndex}].value`}
                        name={`inputs[${index}].extra[${extIndex}].value`}
                        className="form-control"
                        placeholder={t("form.inputs.extra.value", {
                          index: extIndex + 1,
                        })}
                        onChange={onChange}
                        value={ext.value}
                        invalid={
                          !!errors.inputs &&
                          !!errors.inputs[index]?.extra &&
                          !!errors.inputs[index]?.extra[extIndex].value
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Button
                  size="sm"
                  color="danger"
                  type="button"
                  className="mt-2 ml-4"
                  onClick={() => removeExtra(extIndex)}
                >
                  <i className="bx bx-xs bx-trash"></i>
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} md={6} className="mt-2">
          <InputGroup
            htmlFor={`inputs[${index}].isRequired`}
            label={t("form.inputs.isRequired.label")}
            error={errors.inputs && errors.inputs[index]?.isRequired}
          >
            <RCheckbox
              id={`inputs[${index}].isRequired`}
              name={`inputs[${index}].isRequired`}
              value={isRequired}
              onChange={(e) => {
                form.setFieldValue(
                  `inputs[${index}].isRequired`,
                  e.target.checked
                );
              }}
              invalid={!!errors.inputs && !!errors.inputs[index]?.isRequired}
            >
              {t("form.inputs.isRequired.title")}
            </RCheckbox>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} className="mt-2">
          <InputGroup
            htmlFor={`inputs[${index}].isUnique`}
            label={t("form.inputs.isUnique.label")}
            error={errors.inputs && errors.inputs[index]?.isUnique}
          >
            <RCheckbox
              id={`inputs[${index}].isUnique`}
              name={`inputs[${index}].isUnique`}
              value={isUnique}
              onChange={(e) => {
                form.setFieldValue(
                  `inputs[${index}].isUnique`,
                  e.target.checked
                );
              }}
              invalid={!!errors.inputs && !!errors.inputs[index]?.isUnique}
            >
              {t("form.inputs.isUnique.title")}
            </RCheckbox>
          </InputGroup>
        </Col>
        {MultiableTypes.includes(type) && (
          <Col xs={12} md={6}>
            <InputGroup
              htmlFor={`inputs[${index}].isMultiple`}
              label={t("form.inputs.isMultiple.label")}
              error={errors.inputs && errors.inputs[index]?.isMultiple}
            >
              <RCheckbox
                id={`inputs[${index}].isMultiple`}
                name={`inputs[${index}].isMultiple`}
                value={isMultiple}
                onChange={(e) => {
                  form.setFieldValue(
                    `inputs[${index}].isMultiple`,
                    e.target.checked
                  );
                }}
                invalid={!!errors.inputs && !!errors.inputs[index]?.isMultiple}
              >
                {t("form.inputs.isMultiple.title")}
              </RCheckbox>
            </InputGroup>
          </Col>
        )}
        <Col xs={12} md={6}>
          <InputGroup
            htmlFor={`inputs[${index}].isPayed`}
            label={t("form.inputs.isPayed.label")}
            error={errors.inputs && errors.inputs[index]?.isPayed}
          >
            <RCheckbox
              id={`inputs[${index}].isPayed`}
              name={`inputs[${index}].isPayed`}
              value={isPayed}
              onChange={(e) => {
                form.setFieldValue(
                  `inputs[${index}].isPayed`,
                  e.target.checked
                );
              }}
              invalid={!!errors.inputs && !!errors.inputs[index]?.isPayed}
            >
              {t("form.inputs.isPayed.title")}
            </RCheckbox>
          </InputGroup>
        </Col>
      </Row>
    </Card>
  );
};

export default CategoryInputForm;
