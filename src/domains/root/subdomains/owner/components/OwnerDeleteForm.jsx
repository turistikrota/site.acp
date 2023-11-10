import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardHeader } from "reactstrap";
import Spin from "sspin";

export default function OwnerDeleteForm({ nickName }) {
  const { t } = useTranslation("owner");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleDelete = async () => {
    const check = await alert.check({
      text: t("delete.check"),
    });
    if (!check) return;
    setIsLoading(true);
    httpClient
      .delete(apiUrl(Services.Owner, `/admin/${nickName}`))
      .then(() => {
        alert.success(t("delete.success"));
        setTimeout(() => {
          window.location.reload();
        }, 700);
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
        <CardHeader className="d-flex align-items-center justify-content-between rounded-full">
          <div>
            <CardHeadContent
              title={t("delete.title")}
              subtitle={t("delete.subtitle")}
            />
          </div>
          <Button type="button" color="danger" onClick={() => handleDelete()}>
            {t("delete.button")}
          </Button>
        </CardHeader>
      </Card>
    </Spin>
  );
}
