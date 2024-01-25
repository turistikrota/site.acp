import NotFoundView from "@/components/Kit/404";
import ContentLoader from "@/components/Kit/ContentLoader";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useMeta } from "@/utils/site";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
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

  console.log(data);

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
          <Col xs={12} md={3}>
            <div>
              <h5>{t("details.sections.user")}</h5>
              <RTable.UserCard name={data.user.name} />
            </div>
            <BookingDetailListingSection listing={data.listing} />
          </Col>
          <Col xs={12} md={9}>
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
        <BookingDetailCancelSection id={data.uuid} onOk={refetch} />
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { BookingDetailView as Component };
