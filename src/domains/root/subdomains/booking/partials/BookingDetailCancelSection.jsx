import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardHeader } from "reactstrap";
import Spin from "sspin";

export default function BookingDetailCancelSection({ id, onOk }) {
  const { t } = useTranslation("booking");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleCancel = () => {
    setIsLoading(true);
    httpClient
      .patch(apiUrl(Services.Booking, `/admin/${id}/cancel`))
      .then(() => {
        alert.success(t("details.cancel.success"));
        if (onOk) onOk()
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
        <CardHeader className="d-flex align-items-center justify-content-between rounded-full">
          <div>
            <CardHeadContent
              title={t("details.cancel.title")}
              subtitle={t("details.cancel.subtitle")}
            />
          </div>
          <Button type="button" color="danger" onClick={() => handleCancel()}>
            {t("details.cancel.button")}
          </Button>
        </CardHeader>
      </Card>
    </Spin>
  );
}
