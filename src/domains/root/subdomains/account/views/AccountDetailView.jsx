import NotFoundView from "@/components/Kit/404"
import ContentLoader from "@/components/Kit/ContentLoader"
import RBreadcrumb from "@/components/Kit/RBreadcrumb"
import { Roles } from "@/config/roles"
import { Services, apiUrl } from "@/config/service"
import PageContentLayout from "@/domains/root/layout/PageContentLayout"
import { useQuery } from "@/hooks/query"
import { useMeta } from "@/utils/site"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import ClaimGuardLayout from "../../account/layout/ClaimGuardLayout"
import AccountProfileImageSection from "../components/AccountProfileImageSection"
import AccountProfileLabelSection from "../components/AccountProfileLabelSection"
import RenderIfClaimExists from "../components/RenderIfClaimExists"
import AccountProfileAnotherSection from "../partials/AccountProfileAnotherSection"
import AccountProfileDeleteForm from "../partials/AccountProfileDeleteForm"
import AccountProfieRestoreForm from "../partials/AccountProfileRestoreForm"

const AccountDetailView = () => {
    const { t } = useTranslation('account')
    const params = useParams()
    const {data, isLoading, refetch} = useQuery(apiUrl(Services.Account, `/admin/${params.nickName}`), {
        cache: false,
        params: {}
    })
    useMeta(t('details.title'))

    if (isLoading) return <ContentLoader />;
  
    if (!data) return <NotFoundView title={params.nickName} />;
    return <ClaimGuardLayout pageName={t('details.title')} roles={[Roles.admin, Roles.Account.super, Roles.Account.view]}>
        <PageContentLayout>
        <RBreadcrumb title={t("details.title")}>
          <RBreadcrumb.Item to="/account">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("details.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <AccountProfileImageSection userName={data.userName} />
        <AccountProfileLabelSection {...data} />
        <AccountProfileAnotherSection userUUID={data.userUuid} userName={data.userName} />
        {data.isDeleted && <RenderIfClaimExists roles={[Roles.admin, Roles.Account.super, Roles.Account.restore]}>
            <AccountProfieRestoreForm userName={data.userName} onOk={refetch} />
            </RenderIfClaimExists>}
        {!data.isDeleted && <RenderIfClaimExists roles={[Roles.admin, Roles.Account.super, Roles.Account.delete]}>
            <AccountProfileDeleteForm userName={data.userName} onOk={refetch} />
            </RenderIfClaimExists>}
        </PageContentLayout>
    </ClaimGuardLayout>
}

export {
    AccountDetailView as Component
}
