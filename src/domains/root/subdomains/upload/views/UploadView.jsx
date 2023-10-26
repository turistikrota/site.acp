import CardHeadContent from "@/components/Kit/CardHeadContent";
import ImageUploader from "@/components/Kit/ImageUploader";
import InputGroup from "@/components/Kit/InputGroup";
import { Config } from "@/config/config";
import { makeCustomSelect } from "@/utils/customSelect";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import Spin from "sspin";

const UploadView = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [app, setApp] = useState(Config.cdn.apps.places);
  const [resizeLevel, setResizeLevel] = useState("high");
  const { t } = useTranslation("upload");

  const resetAll = () => {
    resetImages();
    setApp(Config.cdn.apps.places);
    setResizeLevel("high");
  };

  const resetImages = () => {
    setImages([]);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Spin loading={loading}>
              <Card className="r-card">
                <CardHeader>
                  <CardHeadContent
                    title={t("title")}
                    subtitle={t("subtitle")}
                  />
                </CardHeader>
                <CardBody>
                  <InputGroup htmlFor="type" label={t("type.label")}>
                    <Select
                      classNamePrefix="select2-selection"
                      placeholder={t("type.placeholder")}
                      title={t("type.title")}
                      options={[
                        Config.cdn.apps.categories,
                        Config.cdn.apps.places,
                      ].map((d) => ({
                        value: d,
                        label: t(`type.options.${d}`),
                      }))}
                      id="type"
                      name="type"
                      value={{
                        value: app,
                        label: t(`type.options.${app}`),
                      }}
                      onChange={(e) => {
                        setApp(e.value);
                      }}
                      theme={makeCustomSelect}
                    />
                  </InputGroup>
                  <InputGroup htmlFor="level" label={t("level.label")}>
                    <Select
                      classNamePrefix="select2-selection"
                      placeholder={t("level.placeholder")}
                      title={t("level.title")}
                      options={["none", "low", "medium", "high"].map((d) => ({
                        value: d,
                        label: t(`level.options.${d}`),
                      }))}
                      id="level"
                      name="level"
                      value={{
                        value: resizeLevel,
                        label: t(`level.options.${resizeLevel}`),
                      }}
                      onChange={(e) => {
                        setResizeLevel(e.value);
                      }}
                      theme={makeCustomSelect}
                    />
                  </InputGroup>
                  <ImageUploader
                    value={images}
                    app={app}
                    minifyLevel={resizeLevel}
                    onChange={(e) => setImages(e)}
                    setLoading={setLoading}
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
                <CardFooter className="d-flex justify-content-between">
                  <Button
                    type="button"
                    color="primary"
                    className="d-flex align-items-center gap-1"
                    onClick={resetImages}
                  >
                    {t("reset-images")}
                  </Button>
                  <Button
                    type="button"
                    className="d-flex align-items-center gap-1"
                    onClick={resetAll}
                  >
                    {t("reset")}
                  </Button>
                </CardFooter>
              </Card>
            </Spin>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export { UploadView as Component };
