import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import RPagination from "@/components/Kit/RPagination";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useMeta } from "@/utils/site";
import debounce from "@turistikrota/ui/utils/debounce";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import Spin from "sspin";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import PlaceCard from "../components/PlaceCard";
import PlaceFilter from "../components/PlaceFilter";
import PlaceFilterSort from "../components/PlaceFilterSort";
import { placeQueryToURL, usePlaceFilter } from "../hooks/place.filter";

const PlaceListView = () => {
  const { t, i18n } = useTranslation("places");
  const { query, isQueryChanged, isFiltered, push } = usePlaceFilter();
  const { data, refetch, isLoading } = useQuery(
    apiUrl(Services.Place, `/place/filter?${placeQueryToURL(query)}`),
    {
      cache: false,
      method: "POST",
      params: query.filter,
    }
  );
  useMeta(t("list.title"));

  const debouncedFilter = debounce(() => {
    refetch();
  }, 500);

  useEffect(() => {
    if (!isQueryChanged) return;
    debouncedFilter();
  }, [isQueryChanged]);

  const onPageChange = (page) => {
    query.page = page;
    push(query);
  };

  return (
    <ClaimGuardLayout
      pageName={t("list.title")}
      roles={[Roles.admin, Roles.Places.any, Roles.Places.list]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("list.title")}>
          {isFiltered && (
            <p className="text-muted mb-0">
              {t("list.total", {
                total: data?.total || 0,
                count: data?.filteredTotal || 0,
              })}
            </p>
          )}
        </RBreadcrumb>
        <Spin loading={isLoading}>
          <Row className="mb-4">
            <Col xs="12" md="6" className="d-flex gap-x-2">
              <PlaceFilter />
            </Col>
            <Col
              xs="12"
              md="6"
              className="d-flex align-items-center justify-content-end gap-x-2"
            >
              <PlaceFilterSort />
            </Col>
          </Row>
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
            {Math.ceil(data?.total / (query?.limit || 10)) > 1 && (
              <Col xs="12">
                <RPagination
                  totalPage={Math.ceil(data?.totalPage / (query?.limit || 10))}
                  page={data?.page}
                  onPageClick={onPageChange}
                />
              </Col>
            )}
          </Row>
        </Spin>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceListView as Component };
