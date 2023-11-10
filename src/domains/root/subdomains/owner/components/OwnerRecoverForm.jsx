import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardHeader } from "reactstrap";
import Spin from "sspin";

export default function OwnerRecoverForm({ nickName }) {
  const { t } = useTranslation("owner");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleRecover = async () => {
    const check = await alert.check({
      text: t("recover.check"),
    });
    if (!check) return;
    setIsLoading(true);
    httpClient
      .patch(apiUrl(Services.Owner, `/admin/${nickName}/recover`))
      .then(() => {
        alert.success(t("recover.success"));
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
              title={t("recover.title")}
              subtitle={t("recover.subtitle")}
            />
          </div>
          <Button type="button" color="success" onClick={() => handleRecover()}>
            {t("recover.button")}
          </Button>
        </CardHeader>
      </Card>
    </Spin>
  );
}
