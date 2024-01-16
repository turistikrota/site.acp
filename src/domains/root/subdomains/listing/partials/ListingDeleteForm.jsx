import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardHeader } from "reactstrap";
import Spin from "sspin";

export default function ListingDeleteForm({ id, onOk }) {
  const { t } = useTranslation("listing");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleDelete = () => {
    setIsLoading(true);
    httpClient
      .delete(apiUrl(Services.Listing, `/admin/${id}`))
      .then(() => {
        alert.success(t("details.delete.success"));
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
              title={t("details.delete.title")}
              subtitle={t("details.delete.subtitle")}
            />
          </div>
          <Button type="button" color="danger" onClick={() => handleDelete()}>
            {t("details.delete.button")}
          </Button>
        </CardHeader>
      </Card>
    </Spin>
  );
}
