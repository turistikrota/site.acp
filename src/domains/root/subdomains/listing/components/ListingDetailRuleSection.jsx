import KeyValue from "@/components/Kit/key-value/KeyValue"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"

const RuleMixers = {
    minAdult: (t, value) => t('details.rules.adult', { value }),
    maxAdult: (t, value) => t('details.rules.adult', { value }),
    minKid: (t, value) => t('details.rules.kid', { value }),
    maxKid: (t, value) => t('details.rules.kid', { value }),
    minBaby: (t, value) => t('details.rules.baby', { value }),
    maxBaby: (t, value) => t('details.rules.baby', { value }),
    minDate: (t, value) => t('details.rules.date', { value }),
    maxDate: (t, value) => t('details.rules.date', { value }),
    onlyFamily: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
    noPet: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
    noSmoke: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
    noAlcohol: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
    noParty: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
    noUnmarried: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
    noGuest: (t, value) => (value ? t('details.rules.yes') : t('details.rules.no')),
  }

const ListingDetailRuleSection = ({validation}) => {
    const { t } = useTranslation('listing')

    const items = useMemo(
        () =>
        Object.entries(validation).map(([key, value]) => ({
            label:
            typeof value === 'boolean' || key.startsWith('no')
                ? t(`details.validation.${key}.title`)
                : t(`details.validation.${key}`),
            value: RuleMixers[key](t, value),
        })),
        [t, validation],
    )
    return <Row className="mt-4 gap-y-4">
          <Col xs={12}>
        <h4 className="text-xl font-semibold">{t('details.rules.title')}</h4>
        </Col>
        {items.map((item, idx) => <Col key={idx} xs={12} md={6}>
                <KeyValue label={item.label} value={item.value} />
            </Col>)}
    </Row>
}

export default ListingDetailRuleSection