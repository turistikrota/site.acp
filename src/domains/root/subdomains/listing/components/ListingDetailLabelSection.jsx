import KeyValue from "@/components/Kit/key-value/KeyValue"
import { useDayJS } from "@/utils/dayjs"
import { useTranslation } from "react-i18next"

const ListingDetailLabelSection = ({
    isActive,
    isDeleted,
    isValid,
    createdAt,
    updatedAt,
}) => {
    const { t } = useTranslation('listing')
    const dayjs = useDayJS()
    return <div className="d-flex gap-2 flex-wrap justify-content-center">
        <KeyValue label={t('details.state.isActive')} value={isActive ? t('details.state.active') : t('details.state.disable')} color={isActive ? 'success' : 'danger'} />
        <KeyValue label={t('details.state.isDeleted')} value={isDeleted ? t('details.state.deleted') : t('details.state.notDeleted')} color={isDeleted ? 'danger' : 'success'} />
        <KeyValue label={t('details.state.isValid')} value={isValid ? t('details.state.valid') : t('details.state.invalid')} color={isValid ? 'success' : 'danger'} />
        <KeyValue label={t('details.state.createdAt')} value={dayjs(createdAt).format('DD MMMM YYYY, HH:mm')} />
        <KeyValue label={t('details.state.updatedAt')} value={dayjs(updatedAt).format('DD MMMM YYYY, HH:mm')} />
    </div>
}

export default ListingDetailLabelSection