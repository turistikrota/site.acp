import CardHeadContent from "@/components/Kit/CardHeadContent";
import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardHeader } from "reactstrap";
import Spin from "sspin";

export default function OwnerVerifyForm({ nickName }) {
  const { t } = useTranslation("owner");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleVerify = async () => {
    const check = await alert.check({
      text: t("verification.check"),
    });
    if (!check) return;
    setIsLoading(true);
    httpClient
      .patch(apiUrl(Services.Owner, `/admin/${nickName}/verify`))
      .then(() => {
        alert.success(t("verification.success"));
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
              title={t("verification.title")}
              subtitle={t("verification.subtitle")}
            />
          </div>
          <Button type="button" color="success" onClick={() => handleVerify()}>
            {t("verification.button")}
          </Button>
        </CardHeader>
      </Card>
    </Spin>
  );
}
