import ContentLoader from "@/components/Kit/ContentLoader";
import InputGroup from "@/components/Kit/InputGroup";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { handleApiError } from "@/utils/api-error";
import { useDayJS } from "@/utils/dayjs";
import { useMeta } from "@/utils/site";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Badge, Button, Col, Input, Row } from "reactstrap";
import RenderIfClaimExists from "../../account/components/RenderIfClaimExists";
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout";
import SupportMessageItem from "../components/SupportMessageItem";

const SupportTicketDetailView = () => {
  const { t } = useTranslation("support");
  const params = useParams();
  const dayjs = useDayJS();
  const [msg, setMsg] = useState("");
  const alert = useAlert();
  const [msgLoading, setMsgLoading] = useState(false);
  const { data, isLoading, error, refetch } = useQuery(
    apiUrl(Services.Support, `/admin/${params.uuid}`),
    {
      cache: false,
      params: {},
    }
  );
  useMeta(t("details.title"));

  const stateVariant = useMemo(() => {
    switch (data?.state) {
      case "open":
        return "primary";
      case "answered":
        return "success";
      case "closed":
        return "danger";
      case "deleted":
        return "danger";
      default:
        return "primary";
    }
  }, [data?.state]);

  const onDelete = async() => {
    const check = await alert.check({
        text: t("details.check.delete"),
      });
      if (!check) return;
    httpClient
      .delete(apiUrl(Services.Support, `/admin/${params.uuid}`))
      .then(() => {
        refetch();
      })
      .catch(handleApiError(alert))
  };

  const onClose = async() => {
    const check = await alert.check({
        text: t("details.check.close"),
      });
      if (!check) return;
    httpClient
      .patch(apiUrl(Services.Support, `/admin/${params.uuid}/close`))
      .then(() => {
        refetch();
      })
      .catch(handleApiError(alert))
  };

  const removeMsg = async(msgId) => {
    const check = await alert.check({
        text: t("details.check.removeMsg"),
      });
      if (!check) return;
    httpClient
      .delete(apiUrl(Services.Support, `/admin/${params.uuid}/${msgId}`))
      .then(() => {
        refetch();
      })
      .catch(handleApiError(alert))
  };

  const addMsg = async(msg) => {
    const check = await alert.check({
        text: t("details.check.addMsg"),
      });
      if (!check) return;
      setMsgLoading(true)
    httpClient
      .post(apiUrl(Services.Support, `/admin/${params.uuid}`), { message: msg })
      .then(() => {
        setMsg("");
        refetch();
      })
      .catch(handleApiError(alert))
      .finally(() => {
        setMsgLoading(false)
      })
  };

  return (
    <ClaimGuardLayout
      pageName={t("details.title")}
      roles={[Roles.admin, Roles.Support.super, Roles.Support.view]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("details.title")}>
          <RBreadcrumb.Item to="/support">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("details.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        {isLoading && <ContentLoader />}
        {!isLoading && error && <div>{t("details.error")}</div>}
        {!isLoading && !error && !!data && (
          <Row>
            <Col xs={12} className="d-flex gap-1 justify-content-end">
              <RenderIfClaimExists
                roles={[Roles.admin, Roles.Support.super, Roles.Support.delete]}
              >
                {data.state !== 'deleted' && <Button color="danger" onClick={onDelete}>
                  {t("details.delete")}
                </Button>}
              </RenderIfClaimExists>
              <RenderIfClaimExists
                roles={[Roles.admin, Roles.Support.super, Roles.Support.close]}
              >
                {['open', 'answered'].includes(data.state) &&<Button color="warning" onClick={onClose}>
                  {t("details.close")}
                </Button>}
              </RenderIfClaimExists>
            </Col>
            <Col
              xs={12}
              className="d-flex justify-content-between align-items-center mt-2"
            >
              <h5>
                <Badge color={stateVariant}>{t(`table.${data.state}`)}</Badge>
              </h5>
              <span>
                {t(data.updatedAt ? "details.fields.updated_at" : "details.fields.created_at", {
                  date: dayjs(
                    data.updatedAt ? data.updatedAt : data.createdAt
                  ).fromNow(),
                })}
              </span>
            </Col>
            <Col xs={12} className="mt-2">
              <h4>{data.subject}</h4>
            </Col>
            <Col xs={12}>
              {data.messages.map((msg) => (
                <SupportMessageItem
                  key={msg.uuid}
                  {...msg}
                  onDelete={() => removeMsg(msg.uuid)}
                />
              ))}
              {data.closedAt && <div className="d-flex pt-2 justify-content-center align-items-center text-danger">
                {t(`details.fields.from_${data.isUserClosed ? 'user' : 'admin'}`)} {t('details.fields.closed_at', {
                    date: dayjs(data.closedAt).fromNow()
                })}
                </div>}
            </Col>
            {data.state !== 'deleted' && <Col xs={12} className="mt-4">
              <InputGroup htmlFor={`message`} label={t("details.form.msg")}>
                <Input
                  id={`message`}
                  name={`message`}
                  type="textarea"
                  className="form-control"
                  placeholder={t("details.form.msg_placeholder")}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  value={msg}
                />
              </InputGroup>
              <Button
                color="primary"
                disabled={msgLoading}
                onClick={() => {
                  addMsg(msg);
                }}
              >
                {t("details.form.send")}
              </Button>
            </Col>}
          </Row>
        )}
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { SupportTicketDetailView as Component };
