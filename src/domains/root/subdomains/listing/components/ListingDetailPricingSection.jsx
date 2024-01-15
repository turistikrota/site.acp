import KeyValue from "@/components/Kit/key-value/KeyValue";
import { useLocalizedCurrencyFormatter } from "@/hooks/intl";
import { useDayJS } from "@/utils/dayjs";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

const ListingDetailPricingSection = ({prices, currency}) => {
    const { t } = useTranslation("listing");
    const dayjs = useDayJS()
    const formatter =useLocalizedCurrencyFormatter(currency)
    return <Row className="mt-4 gap-y-4">
        <Col xs={12}>
        <h4 className="text-xl font-semibold">{t('details.pricing.title')}</h4>
        </Col>
        {prices.map((price, idx) => <Col key={idx} xs={12} md={6}>
                <KeyValue label={t('details.pricing.range', {
                    start: dayjs(price.startDate).format('DD MMMM YYYY'),
                    end: dayjs(price.endDate).format('DD MMMM YYYY')
                })} value={formatter.format(price.price)} />
            </Col>)}
    </Row>
}

export default ListingDetailPricingSection