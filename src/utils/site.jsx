import { useTranslation } from "react-i18next";

export const useMeta = (title) => {
  const { t } = useTranslation("common");
  document.title = `${title} | ${t("app")}`;
  return { t };
};
