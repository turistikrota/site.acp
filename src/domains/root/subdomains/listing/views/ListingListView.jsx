import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
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
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const emptyTranslation = {
    title:'',
    slug: '',
    description: '',
}

const ListingListView = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const { t, i18n } = useTranslation("listing");
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(
      apiUrl(Services.Listing, `/admin?page=${page}${query ? `&q=${query}` : ""}`),
      {
        cache: false,
        method: "POST",
        params: {
            query: query,
        },
        headers: {
            'Accept-Language': i18n.language
        }
      }
    );
    useMeta(t("list.title"));

    const debouncedQuerySetter = debounce((value) => {
        setQuery(value)
    }, 500)
    const columns = useMemo(
        () => [
          {
            Header: t("table.business"),
            Cell: ({ row }) => <RTable.BusinessCard uuid={row.original.business.uuid} name={row.original.business.nickName} />,
          },
          {
            Header: t("table.listing"),
            Cell: ({ row }) => <RTable.PostCard image={row.original?.images[0]?.url} title={getTranslation(row.original.meta, i18n.language, emptyTranslation).title} uuid={row.original.uuid} />,
          },
          {
            Header: t("table.location"),
            Cell: ({ row }) => <span>{row.original.location.street}, {row.original.location.city}</span>,
          },
          {
            Header: t("table.actions"),
            Cell: ({ row }) => <Button
            color="primary"
            size="sm"
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
                navigate(`/listing/${row.original.uuid}`)
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
          roles={[Roles.admin, Roles.Listing.super, Roles.Listing.view]}
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
                    <RTable.Search value={query} onChange={debouncedQuerySetter} placeholder={t('table.filter')} />
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
  ListingListView as Component
};

