import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useLocalizedCurrencyFormatter } from "@/hooks/intl";
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
import { getBookingState } from "../hooks/booking.hooks";

const BookingListView = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("")
    const { t, i18n } = useTranslation("booking");
    const dayjs = useDayJS()
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(
      apiUrl(Services.Booking, `/admin?page=${page}${query ? `&q=${query}` : ""}`),
      {
        cache: false,
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
            Header: t("table.listing"),
            Cell: ({ row }) =>  (row.original.listing.images && row.original.listing.images.length > 0) ? <RTable.PostCard image={row.original.listing.images[0]?.url} title={row.original.listing.title} uuid={row.original.listingUUID} /> : <span>{row.original.listing.title}</span>,
          },
          {
            Header: t("table.user"),
            Cell: ({ row }) => <RTable.UserCard name={row.original.user.name} />,
          },
          {
            Header: t("table.state"),
            Cell: ({ row }) => <h5><Badge color={getBookingState(row.original.state)}>{t(`states.${row.original.state}`)}</Badge></h5>,
          },
          {
            Header: t("table.date"),
            Cell: ({ row }) => <span>{dayjs(row.original.startDate).format('DD MMMM YYYY')} <i className='bx bx-right-arrow-alt bx-s' ></i> {dayjs(row.original.endDate).format('DD MMMM YYYY')}</span>,
          },
          {
            Header: t("table.price"),
            Cell: ({ row }) => {
                const formatter = useLocalizedCurrencyFormatter(row.original.currency)
                return <span>{formatter.format(row.original.price)}</span>
            },
          },
          {
            Header: t("table.createdDate"),
            Cell: ({ row }) => <span>{dayjs(row.original.createdDate).format('DD MMMM YYYY')}</span>,
          },
          {
            Header: t("table.actions"),
            Cell: ({ row }) => <Button
            color="primary"
            size="sm"
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
                navigate(`/bookings/${row.original.uuid}`)
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
          roles={[Roles.admin, Roles.Booking.super, Roles.Booking.list]}
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
                      total={data?.total > 0 ? Math.ceil(data?.total / 10) : 1}
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
    BookingListView as Component
};

