import { useLocalizedCurrencyFormatter } from "@/hooks/intl";
import { useTranslation } from "react-i18next";
import styles from "./BalanceCard.module.scss"
import { Card, CardHeader, CardBody } from "reactstrap";

export default function BalanceCard({balance, withoutFormat, field, className}) {
    const { t } = useTranslation("payment");
    const formatter =useLocalizedCurrencyFormatter(balance.currencyInfo.code);
    return <Card className={styles.card}>
    <CardHeader className={`text-muted ${styles.card_head}`}>
        {t(`papara.balances.${field}`)}
    </CardHeader>
    <CardBody  className={`${styles.card_body} ${className ? className :''}`}>
    {!withoutFormat ? formatter.format(balance.totalBalance) : balance.totalBalance}
    </CardBody>
</Card>
}