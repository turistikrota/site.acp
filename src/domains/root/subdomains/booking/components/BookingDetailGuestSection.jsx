import RTable from "@/components/Kit/RTable"
import { useTranslation } from "react-i18next"
import { Card, Col, Row } from "reactstrap"
import styles from "./GuestSection.module.scss"

const BookingDetailGuestSection = ({
    guests,
}) => {
    const { t } = useTranslation('booking')
    return <div className="w-full mt-3">
        <h5>{t('details.state.guests')}</h5>
        <Row className="w-full">
            {guests.map((guest, idx) => <Col key={idx} xs={6} sm={3}>
                <Card className={styles.guestCard}>
                <RTable.UserCard name={guest.name}>
                <span className={`text-white ${styles.guestCard_text}`}>{guest.organizer ? t('details.guests.organizer') : guest.isPublic ? t('details.guests.public') : t('details.guests.private')}</span>
                </RTable.UserCard>
                </Card>
            </Col>)}
        </Row>
    </div>
}

export default BookingDetailGuestSection