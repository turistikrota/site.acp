import KeyValue from "@/components/Kit/key-value/KeyValue"
import { useDayJS } from "@/utils/dayjs"
import { useTranslation } from "react-i18next"
import { Col, Row } from "reactstrap"


const AccountProfileLabelSection = ({
    fullName, description, completedRate, birthDate, isActive, isDeleted, isVerified, createdAt, updatedAt
}) => {
    const { t } = useTranslation('account')
    const dayjs = useDayJS()
    return <Row className="gap-y-4 mt-4">
        <Col xs={12}  className="d-flex gap-4 justify-content-center flex-wrap">
        <KeyValue label={t('details.fullName')} value={fullName ? fullName : t('details.notSet')} />
        <KeyValue label={t('details.completedRate')} value={`${completedRate}%`} color={completedRate >= 50 && completedRate < 75 ? 'warning' : completedRate >= 75 ? 'success' : 'danger'} />
        <KeyValue label={t('details.birthDate')} value={birthDate ? dayjs(birthDate).format('DD MMMM YYYY') : t('details.notSet')} />
        <KeyValue label={t('details.isActive')} value={isActive ? t('details.active') : t('details.inactive')} color={isActive ? 'success' : 'danger'} />
        <KeyValue label={t('details.isDeleted')} value={isDeleted ? t('details.deleted') : t('details.notDeleted')} color={isDeleted ? 'danger' : 'success'} />
        <KeyValue label={t('details.isVerified')} value={isVerified ? t('details.verified') : t('details.notVerified')} color={isVerified ? 'success' : 'danger'} />
        <KeyValue label={t('details.createdAt')} value={dayjs(createdAt).format('DD MMMM YYYY HH:mm')} />
        <KeyValue label={t('details.updatedAt')} value={dayjs(updatedAt).format('DD MMMM YYYY HH:mm')} />
        </Col>
        <Col xs={12}>
            <KeyValue label={t('details.description')} value={description? description : t('details.notSet')} />
        </Col>
    </Row>
}

export default AccountProfileLabelSection