import CardHeadContent from "@/components/Kit/CardHeadContent";
import InputGroup from "@/components/Kit/InputGroup";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import Spin from "sspin";

export default function BookingDetailCancelSection({ id, onOk }) {
  const { t } = useTranslation("booking");
  const [isLoading, setIsLoading] = useState(false);
  const [trContent, setTrContent] = useState("");
  const [enContent, setEnContent] = useState("");
  const alert = useAlert();

  const handleCancel = () => {
    setIsLoading(true);
    httpClient
      .patch(apiUrl(Services.Booking, `/admin/${id}/cancel`), {
        tr: {
          content: trContent,
        },
        en: {
          content: enContent,
        },
      })
      .then(() => {
        alert.success(t("details.cancel.success"));
        if (onOk) onOk();
      })
      .catch((err) => {
        parseApiError({
          error: err.response.data,
          alert,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Spin loading={isLoading}>
      <Card className="r-card mt-4">
        <CardHeader>
          <CardHeadContent
            title={t("details.cancel.title")}
            subtitle={t("details.cancel.subtitle")}
          />
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={12}>
              <InputGroup label={t("details.cancel.trContent")}>
                <Input
                  type="text"
                  className="form-control"
                  placeholder={t("details.cancel.trContent_placeholder")}
                  onChange={(e) => setTrContent(e.target.value)}
                  value={trContent}
                />
              </InputGroup>
            </Col>
            <Col xs={12}>
              <InputGroup label={t("details.cancel.enContent")}>
                <Input
                  type="text"
                  className="form-control"
                  placeholder={t("details.cancel.enContent_placeholder")}
                  onChange={(e) => setEnContent(e.target.value)}
                  value={enContent}
                />
              </InputGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button type="button" color="danger" onClick={() => handleCancel()}>
            {t("details.cancel.button")}
          </Button>
        </CardFooter>
      </Card>
    </Spin>
  );
}
