import ContentLoader from "@/components/Kit/ContentLoader"
import KeyValue from "@/components/Kit/key-value/KeyValue"
import { Services, apiUrl } from "@/config/service"
import { useQuery } from "@/hooks/query"
import { getTranslation } from "@/utils/i18n"
import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"
import { useCategoryFeatures } from "~subdomains/category/hooks/category.fields"

const ListingDetailCategorySection = ({categoryUUIDs, features}) => {
    const { t, i18n } = useTranslation('listing')
    const { data: fields, isLoading: fieldLoading } = useQuery(apiUrl(Services.Category, `/fields?uuids=${categoryUUIDs.join(',')}`))
    const { data: categories, isLoading: categoryLoading } = useQuery(apiUrl(Services.Category, `/?uuids=${categoryUUIDs.join(',')}`))

    const { filterByGroup, fixValue } = useCategoryFeatures(fields?.inputGroups || [], features)
    
    if (fieldLoading || categoryLoading) return <ContentLoader />
    if (!fields && !categories) return <></>
    return <>
        <section>
            <h4 className="mb-2 text-xl font-semibold">{t('details.category.title')}</h4>
            {categories && <h5>
                {categories.map((c) => getTranslation(c.meta, i18n.language, {title:''}).title).join(', ')}
            </h5>}
        </section>

        {fields && fields.inputGroups.map((group, groupIdx) => <section key={groupIdx} className="mt-4">
            <h5>{getTranslation(group.translations, i18n.language, {name: ''}).name}</h5>
            <p>{getTranslation(group.translations, i18n.language, {description: ''}).description}</p>
            <Row className="mt-4 gap-y-4">
                {filterByGroup(group.uuid).map((feature, featureIdx) => <Col key={featureIdx} xs={12} md={6}>
                    <KeyValue  label={feature.translation.name} value={fixValue(feature.value, feature.extra) || t('category-features.empty')} />
                    </Col>)}
            </Row>
        </section>)}
    </>
}

export default ListingDetailCategorySection