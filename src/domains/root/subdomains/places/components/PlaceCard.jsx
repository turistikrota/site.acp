import FiveStars from "@/components/Kit/Stars";
import { useDayJS } from "@/utils/dayjs";
import { useImageSrc } from "@turistikrota/ui/hooks/image";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

function DetailItem({ field, value, grouped = false, valueClassName = "" }) {
  return (
    <div
      className={`d-flex align-items-center place-detail-item ${
        grouped ? "place-detail-item-grouped" : ""
      }`}
    >
      <div className="place-detail-item-key pl-1">
        <p className="text-muted mb-0">{field}</p>
      </div>
      <div className="place-detail-item-value pl-1">
        <p className={`mb-0 ${valueClassName ? valueClassName : "text-muted"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function PlaceCard({
  uuid,
  coordinates,
  isActive,
  isDeleted,
  isPayed,
  review,
  type,
  updatedAt,
  timeSpent,
  images,
  translations,
  locale,
}) {
  const { t } = useTranslation("places");
  const dayjs = useDayJS(locale);
  const { src, onError } = useImageSrc(
    images.length > 0 ? images[0].url : null
  );
  const translationObject = translations[locale]
    ? translations[locale]
    : translations[Object.keys(translations)[0]];
  return (
    <Card className="place-card">
      <CardBody>
        <div className="place-img position-relative">
          <Link href={`/places/${uuid}`} target="_blank">
            <img
              src={src}
              onError={onError}
              alt=""
              className="img-fluid mx-auto d-block"
            />
          </Link>
        </div>
        <div className="mt-4 text-center">
          <h5 className="mb-3 text-truncate">{translationObject.title}</h5>
          <p className="text-muted mb-4 min-line-clamp-2">
            {translationObject.description}
          </p>
        </div>
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
          <div className="place-review-stars">
            <FiveStars star={review.averagePoint} iconSize="bx-sm" />
          </div>
          <div className="place-review-count mt-2">
            <p className="mb-0">{review.total} Değerlendirme</p>
          </div>
        </div>
        <div className="mt-4">
          <DetailItem field="Enlem" value={coordinates[0]} grouped />
          <DetailItem field="Boylam" value={coordinates[1]} />
          <DetailItem field="Ücretli" value={isPayed ? "Evet" : "Hayır"} />
          <DetailItem
            field="Aktif"
            value={isActive ? "Evet" : "Hayır"}
            valueClassName={`text-${isActive ? "success" : "danger"}`}
          />
          <DetailItem
            field="Silinmiş"
            value={isDeleted ? "Evet" : "Hayır"}
            valueClassName={`text-${!isDeleted ? "success" : "danger"}`}
          />
          <DetailItem
            field="Ort. Ziyaret"
            value={`${timeSpent.min} - ${timeSpent.max} dk`}
          />
          <DetailItem field="Yer Tipi" value={type || "other"} />
          <DetailItem
            field="Son Güncelleme"
            value={dayjs(updatedAt).format("DD.MM.YYYY HH:mm")}
          />
          <Link href={`/places/${uuid}`} target="_blank">
            <Button color="primary" className="mt-3" block type="button">
              {t("edit")}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
