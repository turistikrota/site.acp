import React from "react";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import { Roles } from "@/config/roles";
import { useTranslation } from "react-i18next";
import PageContentLayout from "~domains/root/layout/PageContentLayout";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";

const PlaceCreateView = () => {
  const { t } = useTranslation("places");
  return (
    <ClaimGuardLayout
      pageName={t("create.title")}
      roles={[Roles.admin, Roles.Places.any, Roles.Places.create]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("create.title")}>
          <RBreadcrumb.Item to="/places">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("create.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceCreateView as Component };
