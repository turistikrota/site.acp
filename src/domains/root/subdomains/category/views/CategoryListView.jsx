import CardHeadContent from "@/components/Kit/CardHeadContent";
import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import PageContentLayout from "~domains/root/layout/PageContentLayout";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const CategoryListView = () => {
  const { t, i18n } = useTranslation("categories");
  const [page, setPage] = useState(1);
  const dayjs = useDayJS();
  const { data, isLoading } = useQuery(
    apiUrl(Services.Category, `/admin?page=${page}`),
    {
      cache: true,
      params: {},
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: t("table.name"),
        Cell: ({ row }) => <span>{row.original.meta[i18n.language].name}</span>,
      },
      {
        Header: t("table.isActive"),
        Cell: ({ row }) => (
          <span>
            {row.original.isActive ? t("table.active") : t("table.passive")}
          </span>
        ),
      },
      {
        Header: t("table.updatedAt"),
        Cell: ({ row }) => (
          <span>
            {dayjs(row.original.updatedAt).format("DD MMMM YYYY HH:mm")}
          </span>
        ),
      },
      {
        Header: t("table.actions"),
        Cell: ({ row }) => (
          <a
            href={`/categories/${row.original.uuid}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              size="sm"
              color="primary"
              className="d-flex align-items-center justify-content-center"
            >
              <i className="bx bx-show bx-xs mr-1"></i>
              {t("table.view")}
            </Button>
          </a>
        ),
      },
    ],
    [t]
  );

  if (isLoading) return <ContentLoader />;

  const onNext = (page) => {
    console.log("page::", page);
    setPage(page);
  };

  const onPrev = (page) => {
    console.log("page::", page);
    setPage(page);
  };

  return (
    <ClaimGuardLayout
      pageName={t("list.title")}
      roles={[Roles.admin, Roles.Categories.any, Roles.Categories.list]}
    >
      <PageContentLayout>
        <Row>
          <Col xs={12}>
            <Card className="r-card">
              <CardHeader>
                <Row>
                  <Col xs={8}>
                    <CardHeadContent
                      title={t("list.title")}
                      subtitle={t("list.subtitle")}
                    />
                  </Col>
                  <Col
                    xs={4}
                    className="d-flex justify-content-end align-items-start"
                  >
                    <a href="/categories/new">
                      <Button
                        size="sm"
                        color="primary"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bx bx-plus bx-xs mr-1"></i>
                        {t("list.create")}
                      </Button>
                    </a>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <RTable columns={columns} rows={data?.list ?? []} />
              </CardBody>
              <CardFooter>
                <RTable.Pagination
                  isPrev={data?.IsPrev}
                  isNext={data?.IsNext}
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

export { CategoryListView as Component };
