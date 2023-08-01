import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Config } from "@/config/config";
import { Roles } from "@/config/roles";
import { Services, apiUrl } from "@/config/service";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useQuery } from "@/hooks/query";
import { useAlert } from "@/utils/alert";
import { useMeta } from "@/utils/site";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Spin from "sspin";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const PlaceEditView = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { data, isLoading: isDetailLoading } = useQuery(
    apiUrl(Services.Place, `/place/${params.uuid}`),
    {
      cache: false,
    }
  );
  const { data: features, isLoading } = useQuery(
    apiUrl(Services.Place, "/feature"),
    {
      cache: true,
    }
  );
  const navigate = useNavigate();
  const alert = useAlert();
  const [trMarkdown, setTrMarkdown] = useState("");
  const [enMarkdown, setEnMarkdown] = useState("");
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation("places");
  useMeta(t("edit.title"));
  const translationObject = !data
    ? null
    : data.translations[i18n.language]
    ? data.translations[i18n.language]
    : data.translations[Object.keys(data.translations)[0]];

  const form = useFormik({
    initialValues: {
      featureUUIDs: [],
      coordinates: [0, 0],
      timeSpent: {
        min: 0,
        max: 0,
      },
      translations: Config.langs.map((l) => ({
        locale: l,
        title: "",
        description: "",
        markdownUrl: "",
        seo: {
          title: "",
          description: "",
          keywords: "",
        },
      })),
      isPayed: false,
      type: "",
    },
    onSubmit: async (values) => {
      const check = await alert.check({
        text: t("edit.check"),
      });
      if (!check) return;
      setLoading(true);
      const [enContent, trContent] = await Promise.all([
        uploadMdContent(enMarkdown, Config.cdn.apps.placesMd),
        uploadMdContent(trMarkdown, Config.cdn.apps.placesMd),
      ]);
      if (!enContent || !trContent) {
        setLoading(false);
        return alert.error({
          text: t("upload.failed"),
        });
      }
      form.setFieldValue("translations[0].markdownUrl", enContent);
      form.setFieldValue("translations[1].markdownUrl", trContent);
      const res = await httpClient
        .post(apiUrl(Services.Place, "/place"), {
          featureUUIDs: values.featureUUIDs,
          images: images.map((img, indx) => ({
            url: img,
            order: indx + 1,
          })),
          coordinates: values.coordinates,
          timeSpent: values.timeSpent,
          translations: values.translations,
          isPayed: values.isPayed,
          type: values.type,
        })
        .catch(handleApiError(alert, form));
      setLoading(false);
      if (![200, 201].includes(res.status)) return;
      navigate("/places");
    },
  });

  useEffect(() => {
    // set default values and load md contents
    console.log("data::", data);
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    form.submitForm();
  };

  return (
    <ClaimGuardLayout
      pageName={t("edit.title")}
      roles={[Roles.admin, Roles.Places.any, Roles.Places.update]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("edit.title")}>
          <RBreadcrumb.Item to="/places">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>
            {!data ? t("edit.title") : translationObject.title}
          </RBreadcrumb.Current>
        </RBreadcrumb>
        <Spin loading={loading || isDetailLoading}></Spin>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceEditView as Component };
