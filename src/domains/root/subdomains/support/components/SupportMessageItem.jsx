import { useDayJS } from "@/utils/dayjs"
import { useTranslation } from "react-i18next"
import styles from "./SupportMessageItem.module.scss"

const SupportMessageItem = ({text, uuid, is_admin, date, onDelete}) => {
    const dayjs = useDayJS()
    const {t} =useTranslation('support')
    return <div className={styles.msgCard}>
        <div className={styles.msgCard_head}>
            <div className={styles.msgCard_head_left}>
                {t(`details.msg.${is_admin ? 'admin': 'user'}`)}
            </div>
            <div className={styles.msgCard_head_right}>
                <span className={styles.msgCard_head_right_date}>{dayjs(date).fromNow()}</span>
                <span onClick={() => onDelete(uuid)} className={styles.msgCard_head_right_delete}>
                    {t('details.msg.delete')}
                </span>
            </div>
        </div>
        <div className={styles.msgCard_body}>
            {text}
        </div>
    </div>
}

export default SupportMessageItem