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
                setBalances(res.data.balances);
                
            }
        }).catch(() =>{
            setBalances([
                {
                    totalBalance: 0,
                    lockedBalance: 0,
                    availableBalance: 0,
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
                <BalanceCard balance={balance} loading={loading} />
            </Col>
            <Col xs={12} md={4}>
            <BalanceCard balance={balance} loading={loading} />
            </Col>
            <Col xs={12} md={4}>
            <BalanceCard balance={balance} loading={loading} />
            </Col>
        </Row>)}
    </>
}