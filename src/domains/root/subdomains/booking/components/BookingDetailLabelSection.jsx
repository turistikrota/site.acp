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
    return <>
    <div className="d-flex gap-2 flex-wrap justify-content-center">
        <KeyValue label={t('details.label.startDate')} value={dayjs(startDate).format('DD MMMM YYYY')} />
        <KeyValue label={t('details.label.endDate')} value={dayjs(endDate).format('DD MMMM YYYY')} />
        <KeyValue label={t('details.label.isPublic')} value={isPublic ? t('details.label.public') : t('details.label.private')} color={isPublic ? 'success' : 'danger'} />
        <KeyValue label={t('details.label.adult')} value={t('details.label.adult_count', {count: adult})} />
        <KeyValue label={t('details.label.child')} value={t('details.label.child_count', {count: child})} />
        <KeyValue label={t('details.label.baby')} value={t('details.label.baby_count', {count: baby})} />
    </div>
    <div className="d-flex gap-2 flex-wrap justify-content-center mt-2">
        <KeyValue label={t('details.label.state')} value={t(`states.${state}`)} color={getBookingState(state)} />
        <KeyValue label={t('details.label.createdAt')} value={dayjs(createdAt).format('DD MMMM YYYY, HH:mm')} />
        <KeyValue label={t('details.label.updatedAt')} value={dayjs(updatedAt).format('DD MMMM YYYY, HH:mm')} />
    </div>
    </>
}

export default BookingDetailLabelSection