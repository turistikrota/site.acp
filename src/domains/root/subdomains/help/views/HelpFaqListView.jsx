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
import { useNavigate } from "react-router-dom";
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

const emptyFaqTranslation = {
    title:'',
    description: '',
    keywords: '',
}

const HelpFaqListView = () => {
  const [query, setQuery] = useState("");
  const dayjs = useDayJS();
  const { t, i18n } = useTranslation("help");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    apiUrl(
      Services.Help,
      `/admin/faq?${query ? `q=${query}` : ""}`
    ),
    {
      cache: false,
      params: {},
    }
  );
  useMeta(t("faq.list.title"));

  const debouncedQuerySetter = debounce((value) => {
    setQuery(value);
  }, 500);

  const columns = useMemo(
    () => [
      {
        Header: t("faq.table.title"),
        Cell: ({ row }) => <span>{getTranslation(row.original.meta, i18n.language, emptyFaqTranslation).title}</span>,
      },
      {
        Header: t("faq.table.isActive"),
        Cell: ({ row }) => <span className={`${row.original.isActive ? 'text-success' : 'text-danger'}`}>{t(`faq.table.${row.original.isActive ? 'active' : 'inactive'}`)}</span>,
      },
      {
        Header: t("faq.table.date"),
        Cell: ({ row }) => (
          <span>{dayjs(row.original.updatedAt).format("DD MMMM YYYY HH:mm")}</span>
        ),
      },
      {
        Header: t("faq.table.actions"),
        Cell: ({ row }) => {
          if (row.original.is_read) return <></>;
          return (
            <RenderIfClaimExists
              roles={[Roles.admin, Roles.Help.Super, Roles.Help.Faq.read, Roles.Help.Faq.super]}
            >
              <Button
                color="primary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                    navigate(`/help/faqs/${row.original.uuid}`);
                }}
              >
                {t("faq.table.view")}
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
      pageName={t("faq.list.title")}
      roles={[Roles.admin, Roles.Help.Super, Roles.Help.Faq.list, Roles.Help.Faq.super]}
    >
      <PageContentLayout>
        <Row>
          <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title={t("faq.list.title")}
                  subtitle={t("faq.list.subtitle")}
                  withoutCount
                />
              </CardHeader>
              <CardBody>
                <RTable.Search
                  value={query}
                  onChange={debouncedQuerySetter}
                  placeholder={t("faq.table.filter")}
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

export { HelpFaqListView as Component };
