import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody } from "reactstrap";
import Spin from "sspin";

export default function PlaceDisableForm({ id }) {
  const { t } = useTranslation("places");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleDisable = () => {
    setIsLoading(true);
    httpClient
      .put(apiUrl(Services.Place, `/place/${id}/disable`))
      .then(() => {
        alert.success(t("disable.success"));
        setTimeout(() => {
          window.location.reload();
        }, 500);
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
      <Card className="r-card mb-4">
        <CardBody className="d-flex align-items-center justify-content-between">
          <div>
            <CardHeadContent
              title={t("disable.title")}
              subtitle={t("disable.subtitle")}
            />
          </div>
          <Button type="button" color="danger" onClick={() => handleDisable()}>
            {t("disable.button")}
          </Button>
        </CardBody>
      </Card>
    </Spin>
  );
}
