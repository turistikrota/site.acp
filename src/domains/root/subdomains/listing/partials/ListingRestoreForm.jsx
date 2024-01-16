import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardHeader } from "reactstrap";
import Spin from "sspin";

export default function ListingRestoreForm({ id, onOk }) {
  const { t } = useTranslation("listing");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleRestore = () => {
    setIsLoading(true);
    httpClient
      .patch(apiUrl(Services.Listing, `/admin/${id}/restore`))
      .then(() => {
        alert.success(t("details.restore.success"));
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
              title={t("details.restore.title")}
              subtitle={t("details.restore.subtitle")}
            />
          </div>
          <Button type="button" color="danger" onClick={() => handleRestore()}>
            {t("details.restore.button")}
          </Button>
        </CardHeader>
      </Card>
    </Spin>
  );
}
