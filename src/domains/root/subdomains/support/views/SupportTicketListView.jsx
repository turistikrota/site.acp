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

const SupportListView = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const [state, setState] = useState("")
    const dayjs = useDayJS();
    const navigate = useNavigate();
    const { t } = useTranslation("support");
    const { data, isLoading } = useQuery(
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
            Cell: ({ row }) => <RTable.UserCard name={row.original.user.name} />,
          },
          {
            Header: t("table.subject"),
            Cell: ({ row }) => <h5>{row.original.subject}</h5>,
          },
          {
            Header: t("table.state"),
            Cell: ({ row }) => {
                let variant = "primary"
                switch(row.original.state) {
                    case "open":
                        variant = "primary"
                        break;
                    case "answered":
                        variant = "success"
                        break;
                    case "closed":
                        variant = "danger"
                        break;
                    case "deleted":
                        variant = "danger"
                        break;
                }
                return <h5><Badge color={variant}>{t(`table.${row.original.state}`)}</Badge></h5>
            },
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
            Cell: ({ row }) => <Button
            color="primary"
            size="sm"
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
                navigate(`/support/${row.original.uuid}`)
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
          roles={[Roles.admin, Roles.Support.super, Roles.Support.list]}
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
                        <RTable.Search value={query} onChange={debouncedQuerySetter} placeholder={t('table.filter.query')} />
                        </Col>
                        <Col xs={3}>
                        <RTable.Select value={state} onChange={setState} title={t('table.filter.state')} options={[
                        {
                            label: t('table.all'),
                            value: ""
                        },
                        {
                            label: t('table.open'),
                            value: "open"
                        },
                        {
                            label: t('table.answered'),
                            value: "answered"
                        },
                        {
                            label: t('table.closed'),
                            value: "closed"
                        },
                        {
                            label: t('table.deleted'),
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

