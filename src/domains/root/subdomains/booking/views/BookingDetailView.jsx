import NotFoundView from "@/components/Kit/404"
import ContentLoader from "@/components/Kit/ContentLoader"
import RBreadcrumb from "@/components/Kit/RBreadcrumb"
import { Roles } from "@/config/roles"
import { Services, apiUrl } from "@/config/service"
import PageContentLayout from "@/domains/root/layout/PageContentLayout"
import { useQuery } from "@/hooks/query"
import { useDayJS } from "@/utils/dayjs"
import { useMeta } from "@/utils/site"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout"

const BookingDetailView = () => {
    const { t, i18n } = useTranslation('booking')
    const params = useParams()
    const dayjs = useDayJS()
    const {data, isLoading, refetch} = useQuery(apiUrl(Services.Booking, `/admin/${params.uuid}`), {
        cache: false,
        params: {}
    })
    useMeta(t('details.title'))

    if (isLoading) return <ContentLoader />;
  
    if (!data) return <NotFoundView title={params.uuid} />;
    return <ClaimGuardLayout pageName={t('details.title')} roles={[Roles.admin, Roles.Booking.super, Roles.Booking.view]}>
        <PageContentLayout>
        <RBreadcrumb title={t("details.title")}>
          <RBreadcrumb.Item to="/bookings">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("details.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        </PageContentLayout>
    </ClaimGuardLayout>
}

export {
    BookingDetailView as Component
}
