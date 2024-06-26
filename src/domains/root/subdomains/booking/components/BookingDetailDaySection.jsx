import KeyValue from "@/components/Kit/key-value/KeyValue"
import { useLocalizedCurrencyFormatter } from "@/hooks/intl"
import { useDayJS } from "@/utils/dayjs"
import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"

const BookingDetailDaySection = ({
    days,
    currency
}) => {
    const { t } = useTranslation('booking')
    const dayjs = useDayJS()
    const formatter = useLocalizedCurrencyFormatter(currency)
    return <div className="w-full mt-3">
        <h5>{t('details.sections.days')}</h5>
        <Row className="w-full">
            {days.map((day, idx) => <Col key={idx} xs={6} sm={3}>
                <KeyValue label={dayjs(day.date).format('DD MMMM YYYY')} value={formatter.format(day.price)} />
            </Col>)}
        </Row>
    </div>
}

export default BookingDetailDaySection