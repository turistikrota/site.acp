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
  Input,
} from "reactstrap";
import Spin from "sspin";

export default function OwnerRejectForm({ nickName }) {
  const { t } = useTranslation("owner");
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const alert = useAlert();

  const handleReject = async () => {
    const check = await alert.check({
      text: t("reject.check"),
    });
    if (!check) return;
    setIsLoading(true);
    httpClient
      .patch(apiUrl(Services.Owner, `/admin/${nickName}/reject`), { reason })
      .then(() => {
        alert.success(t("reject.success"));
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleReject();
        }}
      >
        <Card className="r-card mb-4">
          <CardHeader className="d-flex align-items-center justify-content-between rounded-full">
            <div>
              <CardHeadContent
                title={t("reject.title")}
                subtitle={t("reject.subtitle")}
              />
            </div>
          </CardHeader>
          <CardBody>
            <InputGroup label={t("reject.reason")}>
              <Input
                type="text"
                className="form-control"
                placeholder={t("reject.placeholder")}
                onChange={(e) => setReason(e.target.value)}
                value={reason}
                required
                maxLength={255}
                minLength={10}
              />
            </InputGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="danger" onClick={() => handleReject()}>
              {t("reject.button")}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Spin>
  );
}
