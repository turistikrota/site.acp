import React from "react";
import { useTranslation } from "react-i18next";

const Copyright = () => {
  const { t } = useTranslation("common");
  return (
    <div className="mt-5 text-center">
      <p>
        © {new Date().getFullYear()} {t("realName")}. {t("copyright")}
      </p>
    </div>
  );
};

export default Copyright;
