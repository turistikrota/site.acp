import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { getTranslation } from "@/utils/i18n";
import { useMeta } from "@/utils/site";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from "reactstrap";
import RenderIfClaimExists from "~subdomains/account/components/RenderIfClaimExists";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const emptyCategoryTranslation = {
    title:'',
}

const HelpCategoryListView = () => {
  const dayjs = useDayJS();
  const { t, i18n } = useTranslation("help");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    apiUrl(
      Services.Help,
      `/admin/category`
    ),
    {
      cache: false,
      params: {},
      headers: {
        "Accept-Language": i18n.language,
      }
    }
  );
  useMeta(t("category.list.title"));
  const columns = useMemo(
    () => [
      {
        Header: t("category.table.title"),
        Cell: ({ row }) => <span>{getTranslation(row.original.meta, i18n.language, emptyCategoryTranslation).title}</span>,
      },
      {
        Header: t("category.table.isActive"),
        Cell: ({ row }) => <span className={`${row.original.isActive ? 'text-success' : 'text-danger'}`}>{t(`category.table.${row.original.isActive ? 'active' : 'inactive'}`)}</span>,
      },
      {
        Header: t("category.table.date"),
        Cell: ({ row }) => (
          <span>{dayjs(row.original.updatedAt).format("DD MMMM YYYY HH:mm")}</span>
        ),
      },
      {
        Header: t("category.table.actions"),
        Cell: ({ row }) => {
          if (row.original.is_read) return <></>;
          return (
            <RenderIfClaimExists
              roles={[Roles.admin, Roles.Help.Super, Roles.Help.Category.read, Roles.Help.Category.super]}
            >
              <Button
                color="primary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                    navigate(`/help/categories/${row.original.uuid}`);
                }}
              >
                {t("category.table.view")}
              </Button>
            </RenderIfClaimExists>
          );
        },
      },
    ],
    [t]
  );

  if (isLoading) return <ContentLoader />;
  return (
    <ClaimGuardLayout
      pageName={t("category.list.title")}
      roles={[Roles.admin, Roles.Help.Super, Roles.Help.Category.list, Roles.Help.Category.super]}
    >
      <PageContentLayout>
        <Row className="gap-y-2">
          <Col lg="12" className="d-flex justify-content-end">
            <Link to="/help/categories/new">
              <Button color="primary">
                {t("category.list.new")}
              </Button>
            </Link>
          </Col>
          <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title={t("category.list.title")}
                  subtitle={t("category.list.subtitle")}
                  withoutCount
                />
              </CardHeader>
              <CardBody>
                <RTable columns={columns} rows={data ?? []} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { HelpCategoryListView as Component };
