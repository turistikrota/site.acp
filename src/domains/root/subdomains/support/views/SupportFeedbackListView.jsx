import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { useDayJS } from "@/utils/dayjs";
import { useMeta } from "@/utils/site";
import debounce from "@turistikrota/ui/utils/debounce";
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
import RenderIfClaimExists from "~subdomains/account/components/RenderIfClaimExists";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const SupportFeedbackListView = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const dayjs = useDayJS();
    const { t } = useTranslation("support");
    const { data, isLoading, refetch } = useQuery(
      apiUrl(Services.Support, `/admin/feedback?page=${page}${query ? `&q=${query}` : ""}`),
      {
        cache: false,
        params: {},
      }
    );
    useMeta(t("feedback.list.title"));

    const debouncedQuerySetter = debounce((value) => {
        setQuery(value)
    }, 500)

    const columns = useMemo(
        () => [
          {
            Header: t("feedback.table.os"),
            Cell: ({ row }) => <span>{row.original.os}</span>,
          },
          {
            Header: t("feedback.table.version"),
            Cell: ({ row }) => <span>{row.original.version}</span>,
          },
          {
            Header: t("feedback.table.user"),
            Cell: ({ row }) => <span>{!row.original.user ? t('feedback.table.no_user') : row.original.user.name}</span>,
          },
          {
            Header: t("feedback.table.message"),
            Cell: ({ row }) => (
              <span>{row.original.message}</span>
            ),
          },
          {
            Header: t("feedback.table.isRead"),
            Cell: ({ row }) => (
              <span>
                {row.original.is_read
                  ? t("feedback.table.read")
                  : t("feedback.table.unread")}
              </span>
            ),
          },
          {
            Header: t("feedback.table.date"),
            Cell: ({ row }) => (
              <span>
                {dayjs(row.original.date).format("DD MMMM YYYY HH:mm")}
              </span>
            ),
          },
          {
            Header: t("feedback.table.actions"),
            Cell: ({ row }) => {
                if(row.original.is_read) return <></>
                return <RenderIfClaimExists roles={[Roles.admin, Roles.Support.Feedback.read]}>
<Button
                color="primary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                    httpClient.patch(apiUrl(Services.Support, `/admin/feedback/${row.original.uuid}`)).then(() => {
                        refetch()
                    }).catch(() => {})
                }}
              >
                {t("feedback.table.markRead")}
              </Button>
                </RenderIfClaimExists>
            },
          },
        ],
        [t]
      );
    
      if (isLoading) return <ContentLoader />;
    
      const onNext = () => {
        setPage(page + 1);
      };
    
      const onPrev = () => {
        setPage(page - 1);
      };
      return (
        <ClaimGuardLayout
          pageName={t("feedback.list.title")}
          roles={[Roles.admin, Roles.Support.Feedback.list]}
        >
          <PageContentLayout>
            <Row>
              <Col lg="12">
                <Card className="r-card">
                  <CardHeader>
                    <RTable.Title
                      title={t("feedback.list.title")}
                      subtitle={t("feedback.list.subtitle")}
                      total={data?.total}
                      filteredTotal={data?.filteredTotal}
                    />
                  </CardHeader>
                  <CardBody>
                    <RTable.Search value={query} onChange={debouncedQuerySetter} placeholder={t('feedback.table.filter')} />
                    <RTable columns={columns} rows={data?.list ?? []} />
                  </CardBody>
                  <CardFooter>
                    <RTable.Pagination
                      isPrev={data?.isPrev}
                      isNext={data?.isNext}
                      current={page}
                      total={Math.ceil(data?.total / 10)}
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
}

export {
    SupportFeedbackListView as Component
};

