import KeyValue from "@/components/Kit/key-value/KeyValue";
import { Services, apiUrl } from "@/config/service";
import { useLocalizedCurrencyFormatter } from "@/hooks/intl";
import { useQuery } from "@/hooks/query";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

const BookingDetailPriceSection = ({ payUUID }) => {
  const { t } = useTranslation("booking");
  const { data, isLoading } = useQuery(
    apiUrl(Services.Pay, `/admin/${payUUID}`),
    {
      cache: false,
      params: {},
    }
  );
  const formatter = useLocalizedCurrencyFormatter(data ? data.currency : "");

  if (isLoading) return <></>;
  if (!data) return <></>;
  return (
    <div>
      <h5>{t("details.sections.payment")}</h5>
      <Row className="w-full gap-y-3">
        <Col xs={12} md={6}>
          <KeyValue
            label={t("details.payment.price")}
            value={formatter.format(data.price)}
          />
        </Col>
        <Col xs={12} md={6}>
          <KeyValue
            label={t("details.payment.comissionRate")}
            value={`%${data.commissionRate.toFixed(2)}`}
          />
        </Col>
        <Col xs={12} md={6}>
          <KeyValue
            label={t("details.payment.commission")}
            value={formatter.format(data.commission)}
          />
        </Col>
        <Col xs={12} md={6}>
          <KeyValue
            label={t("details.payment.totalPrice")}
            value={formatter.format(data.totalPrice)}
          />
        </Col>
        <Col xs={12} md={6}>
          <KeyValue label={t("details.payment.state")} value={data.state} />
        </Col>
      </Row>
    </div>
  );
};

const BookingDetailPriceProvider = ({ bookingUUID }) => {
  const { t } = useTranslation("booking");
  const { data, isLoading } = useQuery(
    apiUrl(Services.Pay, `/by-booking/${bookingUUID}`),
    {
      cache: false,
      params: {},
    }
  );
  if (isLoading) return <></>;

  if (!data)
    return (
      <div>
        <h5>{t("details.sections.payment")}</h5>
        <p className="text-error">{t("details.sections.payment_loading")}</p>
      </div>
    );
  return <BookingDetailPriceSection payUUID={data.uuid} />;
};

export default BookingDetailPriceProvider;
