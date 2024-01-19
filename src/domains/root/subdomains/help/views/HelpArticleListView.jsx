import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { getTranslation } from "@/utils/i18n";
import { useMeta } from "@/utils/site";
import debounce from "@turistikrota/ui/utils/debounce";
import { useMemo, useState } from "react";
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

const emptyArticleTranslation = {
    title:'',
}

const HelpArticleListView = () => {
  const [query, setQuery] = useState("");
  const dayjs = useDayJS();
  const { t, i18n } = useTranslation("help");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    apiUrl(
      Services.Help,
      `/admin/article?${query ? `q=${query}` : ""}`
    ),
    {
      cache: false,
      params: {},
      headers: {
        "Accept-Language": i18n.language,
      }
    }
  );
  useMeta(t("article.list.title"));

  const debouncedQuerySetter = debounce((value) => {
    setQuery(value);
  }, 500);

  const columns = useMemo(
    () => [
      {
        Header: t("article.table.title"),
        Cell: ({ row }) => <span>{getTranslation(row.original.meta, i18n.language, emptyArticleTranslation).title}</span>,
      },
      {
        Header: t("article.table.isActive"),
        Cell: ({ row }) => <span className={`${row.original.isActive ? 'text-success' : 'text-danger'}`}>{t(`article.table.${row.original.isActive ? 'active' : 'inactive'}`)}</span>,
      },
      {
        Header: t("article.table.date"),
        Cell: ({ row }) => (
          <span>{dayjs(row.original.updatedAt).format("DD MMMM YYYY HH:mm")}</span>
        ),
      },
      {
        Header: t("article.table.actions"),
        Cell: ({ row }) => {
          if (row.original.is_read) return <></>;
          return (
            <RenderIfClaimExists
              roles={[Roles.admin, Roles.Help.Super, Roles.Help.Article.read, Roles.Help.Article.super]}
            >
              <Button
                color="primary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                    navigate(`/help/${row.original.uuid}`);
                }}
              >
                {t("article.table.view")}
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
      pageName={t("article.list.title")}
      roles={[Roles.admin, Roles.Help.Super, Roles.Help.Article.list, Roles.Help.Article.super]}
    >
      <PageContentLayout>
        <Row className="gap-y-2">
          <Col lg="12" className="d-flex justify-content-end">
            <Link to="/help/new">
              <Button color="primary">
                {t("article.list.new")}
              </Button>
            </Link>
          </Col>
          <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title={t("article.list.title")}
                  subtitle={t("article.list.subtitle")}
                  withoutCount
                />
              </CardHeader>
              <CardBody>
                <RTable.Search
                  value={query}
                  onChange={debouncedQuerySetter}
                  placeholder={t("article.table.filter")}
                />
                <RTable columns={columns} rows={data ?? []} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { HelpArticleListView as Component };
