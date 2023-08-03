import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { Roles } from "@/config/roles";
import { useMeta } from "@/utils/site";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import PageContentLayout from "../layout/PageContentLayout";
import ClaimGuardLayout from "../subdomains/account/layout/ClaimGuardLayout";

function RootDashboardView() {
  const user = useSelector((state) => state.account.current);
  const { t } = useTranslation("dashboard");
  useMeta(t("title"));
  return (
    <ClaimGuardLayout pageName={t("title")} roles={[Roles.admin]}>
      <PageContentLayout>
        <RBreadcrumb title={t("title")}></RBreadcrumb>
        <Row>
          <Col xs="12" md="4">
            <Card>
              <CardBody>
                {t("welcome", {
                  username: user.email,
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
}

export { RootDashboardView as Component };
