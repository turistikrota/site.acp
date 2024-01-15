import NotFoundView from "@/components/Kit/404"
import ContentLoader from "@/components/Kit/ContentLoader"
import RBreadcrumb from "@/components/Kit/RBreadcrumb"
import { Roles } from "@/config/roles"
import { Services, apiUrl } from "@/config/service"
import PageContentLayout from "@/domains/root/layout/PageContentLayout"
import { useQuery } from "@/hooks/query"
import { getTranslation } from "@/utils/i18n"
import { useMeta } from "@/utils/site"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout"
import ListingDetailBaseSection from "../components/ListingDetailBaseSection"
import ListingDetailCategorySection from "../components/ListingDetailCategorySection"
import ListingDetailLabelSection from "../components/ListingDetailLabelSection"
import ListingDetailLocationSection from "../components/ListingDetailLocationSection"
import ListingDetailPricingSection from "../components/ListingDetailPricingSection"
import ListingDetailRuleSection from "../components/ListingDetailRuleSection"

const emptyTranslations = {
    title: '',
    description: '',
    slug:'',
}

const ListingDetailView = () => {
    const { t, i18n } = useTranslation('listing')
    const params = useParams()
    const {data, isLoading} = useQuery(apiUrl(Services.Listing, `/admin/${params.uuid}`), {
        cache: false,
        params: {}
    })
    useMeta(t('details.title'))

    const translations = useMemo(() => {
        if(!data) return emptyTranslations
        return getTranslation(data.meta, i18n.language, emptyTranslations)
    }, [data, i18n.language])

    if (isLoading) return <ContentLoader />;
  
    if (!data) return <NotFoundView title={params.nickName} />;
    return <ClaimGuardLayout pageName={t('details.title')} roles={[Roles.admin, Roles.Listing.super, Roles.Listing.view]}>
        <PageContentLayout>
        <RBreadcrumb title={t("details.title")}>
          <RBreadcrumb.Item to="/listing">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("details.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <ListingDetailLabelSection isActive={data.isActive} isDeleted={data.isDeleted} isValid={data.isValid} createdAt={data.createdAt} updatedAt={data.updatedAt} />
        <ListingDetailBaseSection slug={translations.slug} images={data.images} title={translations.title} description={translations.description} />
        <ListingDetailCategorySection categoryUUIDs={data.categoryUUIDs} features={data.features} />
        <ListingDetailLocationSection coordinates={data.location.coordinates} city={data.location.city} district={data.location.street} country={data.location.country} address={data.location.address} isStrict={data.location.isStrict} />
        <ListingDetailPricingSection prices={data.prices} currency={data.currency} />
        <ListingDetailRuleSection validation={data.validation} />
        </PageContentLayout>
    </ClaimGuardLayout>
}

export {
    ListingDetailView as Component
}
