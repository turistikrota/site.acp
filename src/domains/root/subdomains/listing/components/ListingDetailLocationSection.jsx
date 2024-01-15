import KeyValue from "@/components/Kit/key-value/KeyValue";
import MapDefaultConfig from "@/components/Map/MapDefaultConfig";
import MapDynamic from "@/components/Map/MapDynamic";
import { useTranslation } from "react-i18next";
import { Marker } from "react-leaflet";
import { Col, Row } from "reactstrap";

const ListingDetailLocationSection = ({
  coordinates,
  city,
  district,
  country,
  address,
  isStrict,
}) => {
  const { t } = useTranslation("listing");
  return (
    <Row className="mt-4">
      <Col xs={12}
        md={6}>
      <h4 className="mb-2 text-xl font-semibold">{t('details.location.title')}</h4>
      <div className="d-flex flex-column gap-4">
      <KeyValue label={t('details.location.country')} value={country} />
        <KeyValue label={t('details.location.city')} value={city} />
        <KeyValue label={t('details.location.district')} value={district} />
        <KeyValue label={t('details.location.address')} value={address} />
        <KeyValue label={t('details.location.isStrict')} value={isStrict ? t('yes') : t('no')} />
      </div>
      </Col>
      <Col
        xs={12}
        md={6}
        style={{
          height: "400px",
        }}
      >
        <MapDynamic position={coordinates} zoom={15}>
          <MapDefaultConfig />
          <Marker position={coordinates} />
        </MapDynamic>
      </Col>
    </Row>
  );
};

export default ListingDetailLocationSection;
