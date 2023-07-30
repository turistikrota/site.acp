import CardHeadContent from "@/components/Kit/CardHeadContent";
import ImageUploader from "@/components/Kit/ImageUploader";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { useState } from "react";
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
  Label,
  Row,
} from "reactstrap";
import PageContentLayout from "~domains/root/layout/PageContentLayout";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const PlaceCreateView = () => {
  const [markdownContents, setMarkdownContents] = useState({
    tr: "",
    en: "",
  });
  const [images, setImages] = useState([
    "https://pbs.twimg.com/media/F2R-vxbXoAANyZz?format=webp&name=900x900",
    "https://pbs.twimg.com/media/F2RiK6cXoAAKgUY?format=webp&name=900x900",
  ]);
  const { t } = useTranslation("places");
  useMeta(t("create.title"));

  const form = useFormik({
    initialValues: {
      featureUUIDs: [],
      images: [],
      coordinates: [],
      timeSpent: {
        min: 0,
        max: 0,
      },
      translations: [
        {
          locale: "en",
          title: "",
          description: "",
          markdownUrl: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
          },
        },
        {
          locale: "tr",
          title: "",
          description: "",
          markdownUrl: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
          },
        },
      ],
      isPayed: false,
      type: "",
    },
    onSubmit: () => {},
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
                    <Col sm="6">
                      <div className="mb-3">
                        <Label htmlFor="productname">Product Name</Label>
                        <Input
                          id="productname"
                          name="productname"
                          type="text"
                          className="form-control"
                          placeholder="Product Name"
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="manufacturername">
                          Manufacturer Name
                        </Label>
                        <Input
                          id="manufacturername"
                          name="manufacturername"
                          type="text"
                          className="form-control"
                          placeholder="Manufacturer Name"
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="manufacturerbrand">
                          Manufacturer Brand
                        </Label>
                        <Input
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="text"
                          className="form-control"
                          placeholder="Manufacturer Brand"
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          type="text"
                          className="form-control"
                          placeholder="Price"
                        />
                      </div>
                    </Col>

                    <Col sm="6">
                      <div className="mb-3">
                        <Label className="control-label">Category</Label>
                        <select className="form-control select2">
                          <option>Select</option>
                          <option value="FA">Fashion</option>
                          <option value="EL">Electronic</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <Label className="control-label">Features</Label>
                        <Select
                          classNamePrefix="select2-selection"
                          placeholder="Choose..."
                          title="Country"
                          options={[
                            { value: "AK", label: "Alaska" },
                            { value: "HI", label: "Hawaii" },
                            { value: "CA", label: "California" },
                            { value: "NV", label: "Nevada" },
                            { value: "OR", label: "Oregon" },
                            { value: "WA", label: "Washington" },
                          ]}
                          isMulti
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="productdesc">Product Description</Label>
                        <textarea
                          className="form-control mb-3"
                          id="productdesc"
                          rows="5"
                          placeholder="Product Description"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardHeadContent
                    title={t("form.coordinates.title")}
                    subtitle={t("form.coordinates.subtitle")}
                  />
                </CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardHeadContent
                    title={t("form.translations.title")}
                    subtitle={t("form.translations.subtitle")}
                  />
                </CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardHeadContent
                    title={t("form.image.title")}
                    subtitle={t("form.image.subtitle")}
                  />
                </CardHeader>
                <CardBody>
                  <ImageUploader
                    app={Config.cdn.apps.places}
                    onChange={(e) => setImages(e)}
                    randomName
                  />
                  <ImageUploader.Preview
                    files={images}
                    onRemove={(url) => {
                      setImages(images.filter((x) => x !== url));
                    }}
                  />
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
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceCreateView as Component };
