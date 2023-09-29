import InputGroup from "@/components/Kit/InputGroup";
import { useTranslation } from "react-i18next";
import { Button, Col, Input, Row } from "reactstrap";
import CategoryInputForm from "./CategoryInputForm";

const CategoryInputGroupForm = ({
  uuid,
  icon,
  inputs,
  form,
  errors,
  translations,
  index,
  onChange,
  onDelete,
  onCreateInput,
  onInputDelete,
}) => {
  const { t } = useTranslation("categories");

  return (
    <Row className="bg-default px-2 py-3 mx-1 rounded my-4">
      <Col xs={12} className="mb-3">
        <Row>
          <Col xs={12} md={8}>
            {t("form.inputGroup.label", { index: index + 1 })}
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
              {t("form.inputGroup.delete", {
                index: index + 1,
              })}
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={9}>
            <InputGroup
              htmlFor={`inputGroups[${index}].icon`}
              label={t("form.inputGroup.icon")}
              error={errors?.inputGroups?.[index]?.icon}
            >
              <Input
                id={`inputGroups[${index}].icon`}
                name={`inputGroups[${index}].icon`}
                className="form-control"
                placeholder={t("form.inputGroup.icon")}
                onChange={onChange}
                value={icon}
                invalid={!!errors?.inputGroups && errors.inputGroups[index]?.icon}
              />
            </InputGroup>
          </Col>
          <Col xs={3}>
            <InputGroup label={t("form.inputGroup.iconPreview")}>
              <div className="d-flex justify-content-center align-items-center">
                <i className={`bx-sm ${icon ? icon : ""}`}></i>
              </div>
            </InputGroup>
          </Col>
        </Row>
      </Col>

      <Col xs={12} className="mb-2">
        {t("translate.tr")}
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <InputGroup
              htmlFor={`inputGroups[${index}].translations.tr.name`}
              label={t("form.inputGroup.name")}
              error={errors?.inputGroups && errors.inputGroups[index]?.translations?.tr?.name}
            >
              <Input
                id={`inputGroups[${index}].translations.tr.name`}
                name={`inputGroups[${index}].translations.tr.name`}
                className="form-control"
                placeholder={t("form.inputGroup.name")}
                onChange={onChange}
                value={translations?.tr?.name}
                invalid={!!errors?.inputGroups && !!errors.inputGroups[index]?.translations?.tr?.name}
              />
            </InputGroup>
          </Col>
          <Col xs={12}>
            <InputGroup
              htmlFor={`inputGroups[${index}].translations.tr.description`}
              label={t("form.inputGroup.description")}
              error={
                errors?.inputGroups && errors.inputGroups[index]?.translations?.tr?.description
              }
            >
              <Input
                id={`inputGroups[${index}].translations.tr.description`}
                name={`inputGroups[${index}].translations.tr.description`}
                className="form-control"
                placeholder={t("form.inputGroup.description")}
                onChange={onChange}
                value={translations?.tr?.description}
                invalid={
                  !!errors?.inputGroups && !!errors.inputGroups[index]?.translations?.tr?.description
                }
              />
            </InputGroup>
          </Col>
        </Row>
      </Col>

      <Col xs={12} className="mb-2">
        {t("translate.en")}
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <InputGroup
              htmlFor={`inputGroups[${index}].translations.en.name`}
              label={t("form.inputGroup.name")}
              error={errors?.inputGroups && errors.inputGroups[index]?.translations?.en?.name}
            >
              <Input
                id={`inputGroups[${index}].translations.en.name`}
                name={`inputGroups[${index}].translations.en.name`}
                className="form-control"
                placeholder={t("form.inputGroup.name")}
                onChange={onChange}
                value={translations?.en?.name}
                invalid={!!errors?.inputGroups && !!errors.inputGroups[index]?.translations?.en?.name}
              />
            </InputGroup>
          </Col>
          <Col xs={12}>
            <InputGroup
              htmlFor={`inputGroups[${index}].translations.en.description`}
              label={t("form.inputGroup.description")}
              error={
                errors?.inputGroups && errors.inputGroups[index]?.translations?.en?.description
              }
            >
              <Input
                id={`inputGroups[${index}].translations.en.description`}
                name={`inputGroups[${index}].translations.en.description`}
                className="form-control"
                placeholder={t("form.inputGroup.description")}
                onChange={onChange}
                value={translations?.en?.description}
                invalid={
                  !!errors?.inputGroups && !!errors.inputGroups[index]?.translations?.en?.description
                }
              />
            </InputGroup>
          </Col>
        </Row>
      </Col>

      <Col xs={12} className="mb-2">
        <Row>
          <Col xs={12} md={8}>
            {t("form.inputs.labels")}
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-end align-items-center"
          >
            <Button
              size="sm"
              color="info"
              type="button"
              onClick={() => onCreateInput()}
            >
              {t("form.inputs.add")}
            </Button>
          </Col>
        </Row>
      </Col>

      <Col xs={12}>
        {inputs
          .map((i, index) => ({ ...i, index: index }))
          .filter((input) => input.groupUUID === uuid)
          .map((input, index) => (
            <CategoryInputForm
              key={index}
              groupIndex={index}
              index={input.index}
              type={input.type}
              translations={input.translations}
              extra={input.extra}
              isMultiple={input.isMultiple}
              isRequired={input.isRequired}
              isPayed={input.isPayed}
              isUnique={input.isUnique}
              options={input.options}
              form={form}
              errors={errors}
              onChange={onChange}
              onDelete={() => onInputDelete(input.uuid)}
            />
          ))}
      </Col>
    </Row>
  );
};

export default CategoryInputGroupForm;
