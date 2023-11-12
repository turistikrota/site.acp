import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { useMeta } from "@/utils/site";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const OwnerListView = () => {
  const [page, setPage] = useState(1);
  const dayjs = useDayJS();
  const navigate = useNavigate();
  const { t } = useTranslation("owner");
  const { data, isLoading } = useQuery(
    apiUrl(Services.Owner, `/admin?page=${page}`),
    {
      cache: true,
      params: {},
    }
  );
  useMeta(t("list.title"));

  const columns = useMemo(
    () => [
      {
        Header: t("table.nickname"),
        Cell: ({ row }) => <span>{row.original.nickName}</span>,
      },
      {
        Header: t("table.realName"),
        Cell: ({ row }) => <span>{row.original.realName}</span>,
      },
      {
        Header: t("table.type"),
        Cell: ({ row }) => <span>{t(`types.${row.original.ownerType}`)}</span>,
      },
      {
        Header: t("table.status"),
        Cell: ({ row }) => (
          <span>
            {row.original.isDeleted
              ? t("status.deleted")
              : row.original.isEnabled
              ? t("status.enabled")
              : t("status.disabled")}
          </span>
        ),
      },
      {
        Header: t("table.isVerified"),
        Cell: ({ row }) => (
          <span>
            {row.original.isVerified
              ? t("verify.ok")
              : row.original.rejectReason
              ? t("verify.rejected")
              : t("verify.pending")}
          </span>
        ),
      },
      {
        Header: t("table.createdAt"),
        Cell: ({ row }) => (
          <span>
            {dayjs(row.original.createdAt).format("DD MMMM YYYY HH:mm")}
          </span>
        ),
      },
      {
        Header: t("table.actions"),
        Cell: ({ row }) => (
          <Button
            color="primary"
            size="sm"
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
              navigate(`/owners/${row.original.nickName}`);
            }}
          >
            <i className="bx bx-sm bx-detail"></i>
          </Button>
        ),
      },
    ],
    [t]
  );

  if (isLoading) return <ContentLoader />;

  const onNext = (page) => {
    setPage(page);
  };

  const onPrev = (page) => {
    setPage(page);
  };
  return (
    <ClaimGuardLayout
      pageName={t("list.title")}
      roles={[Roles.admin, Roles.Owner.list]}
    >
      <PageContentLayout>
        <Row>
          <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title={t("list.title")}
                  subtitle={t("list.subtitle")}
                  total={data?.total}
                  filteredTotal={data?.filteredTotal}
                />
              </CardHeader>
              <CardBody>
                <RTable columns={columns} rows={data?.list ?? []} />
              </CardBody>
              <CardFooter>
                <RTable.Pagination
                  isPrev={data?.isPrev}
                  isNext={data?.isNext}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { OwnerListView as Component };
