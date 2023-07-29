import React from "react";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import { Roles } from "@/config/roles";
import { useTranslation } from "react-i18next";

const PlaceCreateView = () => {
  const { t } = useTranslation("places");
  return (
    <ClaimGuardLayout
      pageName={t("create.title")}
      roles={[Roles.Places.any, Roles.Places.create]}
    >
      <h1>PlaceCreateView</h1>
    </ClaimGuardLayout>
  );
};

export { PlaceCreateView as Component };
