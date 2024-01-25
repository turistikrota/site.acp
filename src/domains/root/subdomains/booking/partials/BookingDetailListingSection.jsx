import RTable from "@/components/Kit/RTable";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import styles from "./ListingSection.module.scss";

const BookingDetailListingSection = ({ listing, listingUUID }) => {
  const { t } = useTranslation("booking");
  return (
    <Link to={`/listing/${listingUUID}`} className="mt-3">
      <h5>{t("details.sections.listing")}</h5>
      <Card className={styles.listingSectionCard}>
        <div className={styles.listingSectionCard_image}>
          {listing.images && listing.images.length > 0 && (
            <img src={listing.images[0]?.url} alt={listing.title} />
          )}
          {!listing.images && (
            <img src="https://via.placeholder.com/150" alt={listing.title} />
          )}
        </div>
        <div className={styles.listingSectionCard_body}>
          <h4>{listing.title}</h4>
          <p>{listing.description}</p>
        </div>
        <div className={styles.listingSectionCard_footer}>
          <div className={styles.listingSectionCard_left}>
            <RTable.BusinessCard name={listing.businessName} />
          </div>
          <div className={styles.listingSectionCard_right}>
            {listing.districtName} • {listing.cityName}, {listing.countryName}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BookingDetailListingSection;
