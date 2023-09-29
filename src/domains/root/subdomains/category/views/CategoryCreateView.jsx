import CardHeadContent from "@/components/Kit/CardHeadContent";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from "reactstrap";
import Spin from "sspin";
import { v4 as uuidv4 } from "uuid";
import PageContentLayout from "~domains/root/layout/PageContentLayout";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import CategoryInputGroupForm from "../components/CategoryInputGroupForm";
import CategoryInputPreview from "../components/CategoryInputPreview";

const CategoryCreateView = () => {
  const { t } = useTranslation("categories");

  const form = useFormik({
    initialValues: {
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
                        onDelete={onInputGroupDelete}
                        onCreateInput={() => onCreateInput(group.uuid)}
                        onInputDelete={(inputUUID) => onInputDelete(inputUUID)}
                      />
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Spin>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { CategoryCreateView as Component };
