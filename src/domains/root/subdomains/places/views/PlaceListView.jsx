import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import debounce from "@turistikrota/ui/cjs/utils/debounce";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import Spin from "sspin";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import PlaceCard from "../components/PlaceCard";
import { placeQueryToURL, usePlaceFilter } from "../hooks/place.filter";

const PlaceListView = () => {
  const { t, i18n } = useTranslation("places");
  const { query, isQueryChanged } = usePlaceFilter();
  const { data, refetch, isLoading } = useQuery(
    apiUrl(Services.Place, `/place/filter?${placeQueryToURL(query)}`),
    {
      cache: false,
      method: "POST",
      params: query,
    }
  );

  const debouncedFilter = debounce(() => {
    refetch();
  }, 500);

  useEffect(() => {
    if (!isQueryChanged) return;
    debouncedFilter();
  }, [isQueryChanged]);

  return (
    <ClaimGuardLayout
      pageName={t("list.title")}
      roles={[Roles.admin, Roles.Places.any, Roles.Places.list]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("list.title")}></RBreadcrumb>
        <Spin loading={isLoading}>
          <Row className="gap-y-6 mb-5">
            {data?.list.map((place) => (
              <Col key={place.uuid} xxl="3" xl="4" sm="6">
                <PlaceCard
                  uuid={place.uuid}
                  locale={i18n.language}
                  images={place.images}
                  translations={place.translations}
                  coordinates={place.coordinates}
                  isActive={place.isActive}
                  isDeleted={place.isDeleted}
                  isPayed={place.isPayed}
                  review={place.review}
                  type={place.type}
                  updatedAt={place.updatedAt}
                  timeSpent={place.averageTimeSpent}
                />
              </Col>
            ))}
          </Row>
        </Spin>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceListView as Component };
