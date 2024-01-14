import ImageUploader from "@/components/Kit/ImageUploader";
import { SiteHosts } from "@/config/site";
import { mapAndSortImages } from "@/utils/image";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

const ListingDetailBaseSection = ({ images, slug, title, description }) => {
  const { t, i18n } = useTranslation("listing");

  return (
    <Row className="gap-3">
      <Col xs={12}>
        <h2>{title}</h2>
        <p className="text-muted">{description}</p>
        <Link
          to={`${SiteHosts.listing[i18n.language]}/${slug}`}
          target="_blank"
        >
          <Button
            color="primary"
            className="d-flex justify-content-center align-items-center gap-1"
          >
            <i className="fa fa-link"></i>
            {t("details.openWithSite")}
          </Button>
        </Link>
      </Col>
      <Col xs={12}>
        <h5>{t("details.images")}</h5>
        <ImageUploader.Preview
          files={mapAndSortImages(images)}
          removeable={false}
        />
      </Col>
    </Row>
  );
};

export default ListingDetailBaseSection;
