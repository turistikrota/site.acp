import KeyValue from "@/components/Kit/key-value/KeyValue"
import { useDayJS } from "@/utils/dayjs"
import { useTranslation } from "react-i18next"
import { getBookingState } from "../hooks/booking.hooks"

const BookingDetailLabelSection = ({
    startDate,
    endDate,
    createdAt,
    updatedAt,
    state,
    adult,
    child,
    baby,
    isPublic,
}) => {
    const { t } = useTranslation('booking')
    const dayjs = useDayJS()
    return <div className="d-flex gap-2 flex-wrap justify-content-center">
        <KeyValue label={t('details.state.startDate')} value={dayjs(startDate).format('DD MMMM YYYY')} />
        <KeyValue label={t('details.state.endDate')} value={dayjs(endDate).format('DD MMMM YYYY')} />
        <KeyValue label={t('details.state.isPublic')} value={isPublic ? t('details.state.public') : t('details.state.private')} color={isPublic ? 'success' : 'danger'} />
        <KeyValue label={t('details.state.adult')} value={adult} />
        <KeyValue label={t('details.state.child')} value={child} />
        <KeyValue label={t('details.state.baby')} value={baby} />
        <KeyValue label={t('details.state.state')} value={t(`details.state.${state}`)} color={getBookingState(state)} />
        <KeyValue label={t('details.state.createdAt')} value={dayjs(createdAt).format('DD MMMM YYYY, HH:mm')} />
        <KeyValue label={t('details.state.updatedAt')} value={dayjs(updatedAt).format('DD MMMM YYYY, HH:mm')} />
    </div>
}

export default BookingDetailLabelSection