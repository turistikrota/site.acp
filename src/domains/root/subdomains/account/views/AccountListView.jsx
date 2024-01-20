import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { useMeta } from "@/utils/site";
import debounce from "@turistikrota/ui/utils/debounce";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Badge, Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row
} from "reactstrap";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const AccountListView = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const dayjs = useDayJS();
    const navigate = useNavigate();
    const { t } = useTranslation("account");
    const { data, isLoading } = useQuery(
      apiUrl(Services.Account, `/admin?page=${page}${query ? `&q=${query}` : ""}`),
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
            Cell: ({ row }) => <RTable.UserCard name={row.original.userName} />,
          },
          {
            Header: t("table.fullName"),
            Cell: ({ row }) => <h5>{row.original.fullName}</h5>,
          },
          {
            Header: t("table.completedRate"),
            Cell: ({ row }) => {
                let variant = "primary"
                if (row.original.completedRate >= 50 && row.original.completedRate < 75) {
                    variant = "warning"
                }
                else if (row.original.completedRate >= 75) {
                    variant = "success"
                }else {
                    variant = "danger"
                }
                return <h5><Badge color={variant}>{row.original.completedRate}%</Badge></h5>
            },
          },
          {
            Header: t("table.isActive"),
            Cell: ({ row }) => <span className={`${row.original.isActive ? 'text-success' : 'text-danger'}`}>{t(`table.${row.original.isActive ? 'active' : 'inactive'}`)}</span>,
          },
          {
            Header: t("table.date"),
            Cell: ({ row }) => (
              <span>
                {dayjs(row.original.createdAt).format("DD MMMM YYYY HH:mm")}
              </span>
            ),
          },
          {
            Header: t("table.actions"),
            Cell: ({ row }) => <Button
            color="primary"
            size="sm"
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
                navigate(`/account/${row.original.uuid}`)
            }}
          >
            <i className="bx bx-sm bx-detail"></i>
          </Button>,
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
          roles={[Roles.admin, Roles.Account.super, Roles.Account.list]}
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
                  <RTable.Search value={query} onChange={debouncedQuerySetter} placeholder={t('table.filter.query')} />
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
    AccountListView as Component
};

