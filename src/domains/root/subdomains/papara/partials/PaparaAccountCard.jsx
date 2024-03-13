import { useState } from "react";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { httpClient } from "@/http/client";
import { Services, apiUrl } from "@/config/service";
import BalanceCard from "../components/BalanceCard";

export default function PaparaAccountCard() {
    const { t } = useTranslation("payment");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [balances, setBalances] = useState([
        {
            totalBalance: t('loading'),
            lockedBalance: t('loading'),
            availableBalance: t('loading'),
            currencyInfo: {
                code: "TRY"
            }
        }
    ]);

    useEffect(() => {
        httpClient.get(apiUrl(Services.Pay, '/admin/papara')).then(res => {
            if(res?.data?.balances) {
              setBalances(res.data.balances)
              setError(false);
            }
        }).catch(() =>{
            setError(true);
            setBalances([
                {
                    totalBalance: t('error'),
                    lockedBalance: t('error'),
                    availableBalance: t('error'),
                    currencyInfo: {
                        code: "TRY"
                    }
                }
            ]);
        }).finally(() => setLoading(false))
    }, [])

    return <>
        <Row className="mb-3">
            <Col xs={12}>
            <h4 className="mb-0 font-size-18">{t('papara.balances.title')}</h4>
            </Col>
        </Row>
        {balances.map((balance, idx) => <Row key={idx}>
            <Col xs={12} md={4}>
                <BalanceCard balance={balance} withoutFormat={loading || error} field={"total"} className={"text-info"} />
            </Col>
            <Col xs={12} md={4}>
            <BalanceCard balance={balance} withoutFormat={loading || error} field={"locked"} className={"text-danger"} />
            </Col>
            <Col xs={12} md={4}>
            <BalanceCard balance={balance} withoutFormat={loading || error} field={"available"} className={"text-success"} />
            </Col>
        </Row>)}
    </>
}