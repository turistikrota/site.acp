import NotFoundView from "@/components/Kit/404";
import CardHeadContent from "@/components/Kit/CardHeadContent";
import ContentLoader from "@/components/Kit/ContentLoader";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { useMeta } from "@/utils/site";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import RenderIfClaimExists from "../../account/components/RenderIfClaimExists";
import OwnerDeleteForm from "../components/OwnerDeleteForm";
import OwnerRecoverForm from "../components/OwnerRecoverForm";
import OwnerRejectForm from "../components/OwnerRejectForm";
import OwnerVerifyForm from "../components/OwnerVerifyForm";

const OwnerDetailView = () => {
  const { t } = useTranslation("owner");
  const params = useParams();
  const dayjs = useDayJS();
  const { data, isLoading } = useQuery(
    apiUrl(Services.Owner, `/admin/${params.nickName}`),
    {
      cache: true,
      params: {},
    }
  );
  useMeta(data ? data.realName : t("detail.title"));

  const labels = useMemo(() => {
    if (!data) return [];
    return [
      {
        icon: data.isVerified
          ? "bx-badge-check"
          : data.rejectReason
          ? "bxs-x-circle"
          : "bxs-help-circle",
        title: data.isVerified
          ? t("verify.ok")
          : data.rejectReason
          ? t("verify.rejected")
          : t("verify.pending"),
        bg: data.isVerified
          ? "success"
          : data.rejectReason
          ? "danger"
          : "warning",
        key: t("table.isVerified"),
      },
      {
        icon: data.isDeleted
          ? "bx-trash"
          : data.isEnabled
          ? "bx-radio-circle-marked"
          : "bxs-circle",
        title: data.isDeleted
          ? t("status.deleted")
          : data.isEnabled
          ? t("status.enabled")
          : t("status.disabled"),
        bg: data.isDeleted ? "danger" : data.isEnabled ? "success" : "danger",
        key: t("table.status"),
      },
      {
        icon: data.ownerType === "individual" ? "bx-user" : "bx-building",
        title: t(`types.${data.ownerType}`),
        bg: "primary",
        key: t("table.type"),
      },
      {
        icon: "bx-calendar-edit",
        title: dayjs(data.updatedAt).format("DD MMMM YYYY"),
        bg: "primary",
        key: t("table.updatedAt"),
      },
      {
        icon: "bx-calendar",
        title: dayjs(data.createdAt).format("DD MMMM YYYY"),
        bg: "primary",
        key: t("table.createdAt"),
      },
    ];
  }, [data, t, dayjs]);

  const generic = useMemo(() => {
    if (!data) return {};
    if (data.ownerType === "individual")
      return {
        ...data.individual,
        dateOfBirth: dayjs(data.individual.dateOfBirth).format("DD MMMM YYYY"),
      };
    return {
      ...data.corporation,
      type: t(`corporation.types.${data.corporation.type}`),
    };
  }, [data, dayjs]);

  if (isLoading) return <ContentLoader />;

  if (!data) return <NotFoundView title={params.nickName} />;

  return (
    <ClaimGuardLayout
      pageName={t("detail.title")}
      roles={[Roles.admin, Roles.Owner.view]}
    >
      <div
        style={{
          background: `url('https://cover.turistikrota.com/~${data?.nickName}.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "280px",
        }}
      ></div>
      <div
        className="d-flex flex-column w-full align-items-center justify-content-center gap-3"
        style={{
          marginTop: "-180px",
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          <img
            src={`https://avatar.turistikrota.com/~${data?.nickName}.png`}
            className="bg-header"
            alt=""
            style={{
              borderRadius: "100%",
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="d-flex justify-content-center flex-column gap-1">
          <h1 className="text-white mb-0">{data?.realName}</h1>
          <h5 className="text-white mb-0 text-center">@{data?.nickName}</h5>
        </div>
      </div>
      <Row
        className="mx-1"
        style={{
          paddingBottom: "100px",
        }}
      >
        <Col lg="12" className="mt-3">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {labels.map((label, index) => (
              <div
                key={index}
                className={`d-flex flex-column p-2 bg-header rounded`}
              >
                <div
                  className={`d-flex align-items-center text-${label.bg} justify-content-center font-size-17 gap-2`}
                >
                  {label.icon && (
                    <i className={`bx ${label.icon} font-size-24`} />
                  )}
                  <span>{label.title}</span>
                </div>
                <div className="text-center mt-1">{label.key}</div>
              </div>
            ))}
          </div>
        </Col>
        {data.rejectReason && (
          <Col sm="12" lg="12" className="mt-4">
            <div className="p-3 bg-header rounded-md">
              <h4 className="alert-heading text-danger">
                {t("reject.reason")}
              </h4>
              <div className="d-flex align-items-center text-danger">
                <span>{data.rejectReason}</span>
              </div>
            </div>
          </Col>
        )}
        {data.ownerType === "individual" && (
          <Col sm="12" lg="6" className="mt-2">
            <Card className="r-card">
              <CardBody>
                {Object.entries(generic).map(([key, value], index) => (
                  <div
                    className="d-flex justify-content-between mb-2"
                    key={index}
                  >
                    <span className="font-weight-bold">
                      {t(`individual.${key}`)}
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        )}
        {data.ownerType === "corporation" && (
          <Col sm="12" lg="6" className="mt-2">
            <Card className="r-card">
              <CardHeader>
                <CardHeadContent
                  title={t("info.title")}
                  subtitle={t("info.subtitle")}
                />
              </CardHeader>
              <CardBody>
                {Object.entries(generic).map(([key, value], index) => (
                  <div
                    className="d-flex justify-content-between mb-2"
                    key={index}
                  >
                    <span className="font-weight-bold">
                      {t(`corporation.${key}`)}
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        )}

        {!data.isVerified && (
          <RenderIfClaimExists roles={[Roles.admin, Roles.Owner.verify]}>
            <OwnerVerifyForm nickName={data.nickName} />
          </RenderIfClaimExists>
        )}
        {!data.rejectReason && (
          <RenderIfClaimExists roles={[Roles.admin, Roles.Owner.reject]}>
            <OwnerRejectForm nickName={data.nickName} />
          </RenderIfClaimExists>
        )}
        <Col sm="12" lg="12">
          <Card className="r-card">
            <CardHeader>
              <CardHeadContent
                title={t("users.title")}
                subtitle={t("users.subtitle")}
              />
            </CardHeader>
            <CardBody>
              <Row className="w-full">
                {data.users.map((user) => (
                  <Col key={user.uuid} lg="6" className="d-flex mb-4">
                    <img
                      src={`https://avatar.turistikrota.com/@${user.name}.png`}
                      alt=""
                      className="rounded-md"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column justify-content-center ml-2">
                      <span className="font-weight-bold">{user.name}</span>
                      <span className="text-muted">
                        {t(`users.joinAt`, {
                          date: dayjs(user.joinAt).format("DD MMMM YYYY"),
                        })}
                      </span>
                      <span className="text-muted">
                        {t("users.totalRole", {
                          total: user.roles.length,
                        })}
                      </span>
                    </div>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>

        {!data.isDeleted && (
          <RenderIfClaimExists roles={[Roles.admin, Roles.Owner.delete]}>
            <OwnerDeleteForm nickName={data.nickName} />
          </RenderIfClaimExists>
        )}
        {data.isDeleted && (
          <RenderIfClaimExists roles={[Roles.admin, Roles.Owner.recover]}>
            <OwnerRecoverForm nickName={data.nickName} />
          </RenderIfClaimExists>
        )}
      </Row>
    </ClaimGuardLayout>
  );
};

export { OwnerDetailView as Component };
