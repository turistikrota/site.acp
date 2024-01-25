import NotFoundView from "@/components/Kit/404";
import ContentLoader from "@/components/Kit/ContentLoader";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { getTranslation } from "@/utils/i18n";
import { useMeta } from "@/utils/site";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout";
import BookingDetailDaySection from "../components/BookingDetailDaySection";
import BookingDetailGuestSection from "../components/BookingDetailGuestSection";
import BookingDetailLabelSection from "../components/BookingDetailLabelSection";
import BookingDetailCancelSection from "../partials/BookingDetailCancelSection";
import BookingDetailListingSection from "../partials/BookingDetailListingSection";
import BookingDetailPriceProvider from "../partials/BookingDetailPriceSection";

const BookingDetailView = () => {
  const { t } = useTranslation("booking");
  const params = useParams();
  const { data, isLoading, refetch } = useQuery(
    apiUrl(Services.Booking, `/admin/${params.uuid}`),
    {
      cache: false,
      params: {},
    }
  );
  useMeta(t("details.title"));

  if (isLoading) return <ContentLoader />;

  if (!data) return <NotFoundView title={params.uuid} />;

  return (
    <ClaimGuardLayout
      pageName={t("details.title")}
      roles={[Roles.admin, Roles.Booking.super, Roles.Booking.view]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("details.title")}>
          <RBreadcrumb.Item to="/bookings">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("details.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Row className="w-full">
            {data.cancelReason && <>
                <Alert color="danger">
                    <h4>{t('details.sections.cancelReason')}</h4>
                    <p className="m-0">{getTranslation(data.cancelReason.content)}</p>
                </Alert>
            </>}
          <Col xs={12} sm={6} md={4} lg={4}>
            <BookingDetailListingSection listingUUID={data.listingUUID} listing={data.listing} />
          </Col>
          <Col xs={12} sm={6} md={8} lg={8}>
            <BookingDetailLabelSection
              adult={data.people.adult}
              baby={data.people.kid || 0}
              child={data.people.child || 0}
              createdAt={data.createdAt}
              endDate={data.endDate}
              isPublic={data.isPublic}
              startDate={data.startDate}
              state={data.state}
              updatedAt={data.updatedAt}
            />
            <BookingDetailGuestSection
              guests={[
                {
                  name: data.user.name,
                  organizer: true,
                },
                ...(data.guests || []),
              ]}
            />
            <BookingDetailPriceProvider bookingUUID={data.uuid} />
            <BookingDetailDaySection
              currency={data.currency}
              days={data.days}
            />
          </Col>
        </Row>
        {!data.cancelReason && <BookingDetailCancelSection id={data.uuid} onOk={refetch} />}
        <div style={{
            height: '100px'
        }}></div>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { BookingDetailView as Component };
