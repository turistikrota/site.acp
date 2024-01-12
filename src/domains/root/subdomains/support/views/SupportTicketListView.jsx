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

const SupportListView = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const [state, setState] = useState("")
    const dayjs = useDayJS();
    const { t } = useTranslation("support");
    const { data, isLoading, refetch } = useQuery(
      apiUrl(Services.Support, `/admin?page=${page}${query ? `&q=${query}` : ""}${state ? `&state=${state}` : ""}`),
      {
        cache: false,
        params: {},
      }
    );
    useMeta(t("list.title"));

    const debouncedQuerySetter = debounce((value) => {
        setQuery(value)
    }, 500)

    const columns = useMemo(
        () => [
          {
            Header: t("table.user"),
            Cell: ({ row }) => <span>{row.original.user.name}</span>,
          },
          {
            Header: t("table.subject"),
            Cell: ({ row }) => <span>{row.original.subject}</span>,
          },
          {
            Header: t("table.message"),
            Cell: ({ row }) => (
              <span>{row.original.message}</span>
            ),
          },
          {
            Header: t("table.state"),
            Cell: ({ row }) => (
              <span>
                {row.original.is_read
                  ? t("table.read")
                  : t("table.unread")}
              </span>
            ),
          },
          {
            Header: t("table.date"),
            Cell: ({ row }) => (
              <span>
                {dayjs(row.original.date).format("DD MMMM YYYY HH:mm")}
              </span>
            ),
          },
          {
            Header: t("table.actions"),
            Cell: ({ row }) => {
                if(row.original.is_read) return <></>
                return <RenderIfClaimExists roles={[Roles.admin, Roles.Support.list]}>
<Button
                color="primary"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                    httpClient.patch(apiUrl(Services.Support, `/admin/support/${row.original.uuid}`)).then(() => {
                        refetch()
                    }).catch(() => {})
                }}
              >
                {t("table.markRead")}
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
          pageName={t("list.title")}
          roles={[Roles.admin, Roles.Support.list]}
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
                    <Row className="justify-content-between">
                        <Col xs={3}>
                        <RTable.Search value={query} onChange={debouncedQuerySetter} placeholder={t('table.filter')} />
                        </Col>
                        <Col xs={3}>
                        <RTable.Select value={state} onChange={setState} title={t('table.filter.state')} options={[
                        {
                            label: t('table.filter.open'),
                            value: "open"
                        },
                        {
                            label: t('table.filter.answered'),
                            value: "answered"
                        },
                        {
                            label: t('table.filter.closed'),
                            value: "closed"
                        },
                        {
                            label: t('table.filter.deleted'),
                            value: "deleted"
                        }
                    ]} />
                        </Col>
                    </Row>
                    <RTable columns={columns} rows={data?.list ?? []} />
                  </CardBody>
                  <CardFooter>
                    <RTable.Pagination
                      isPrev={data?.isPrev}
                      isNext={data?.isNext}
                      current={page}
                      total={data?.totalPage > 0 ? Math.ceil(data?.totalPage / 10) : 1}
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
    SupportListView as Component
};

