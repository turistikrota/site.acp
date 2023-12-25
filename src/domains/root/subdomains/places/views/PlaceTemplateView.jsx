import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import RTable from "@/components/Kit/RTable";
import { Roles } from "@/config/roles";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import useAutoSave from "@/hooks/autosave";
import { useMeta } from "@/utils/site";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const PlaceTemplateView = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("places");
    const autoSave = useAutoSave()
    useMeta(t("autosave.title"));
    const [fields, setFields] = useState(autoSave.getAll())

    const columns = useMemo(() => [
        {
            Header: t('autosave.table.name'),
            Cell: ({row}) => <div style={{
                width: '100%',
            }}>{row.original.name}</div>
        },
        {
          Header: t("autosave.table.actions"),
          Cell: ({ row }) => (
            <div className="d-flex gap-2">
            <Button
              color="primary"
              size="sm"
              className="d-flex align-items-center justify-content-center"
              onClick={() => onEdit(row.original.key)}
            >
              <i className="bx bx-sm bx-edit-alt"></i>
              {t("autosave.table.edit")}
            </Button>
            <Button
                color="danger"
                size="sm"
                className="d-flex align-items-center justify-content-center"
                onClick={() => onRemove(row.original.key)}
                >
                <i className="bx bx-sm bx-trash"></i>
                {t("autosave.table.remove")}
            </Button>
            </div>
          ),
        },
    ], [t])

    const onRemove = (key) => {
        autoSave.remove(key)
        setFields(autoSave.getAll())
    }

    const onEdit = (key) => {
        navigate(`/places/new?form_id=${key}`)
    }

    const getTitle = (value) => {
        if(!value || !value.translations || value.translations.length === 0) return t('autosave.table.no_name')
        if (value.translations.length === 1) return value.translations[0].title
        return value.translations[1].title || value.translations[0].title
    }

    return <ClaimGuardLayout       pageName={t("autosave.title")}
    roles={[Roles.admin, Roles.Places.any, Roles.Places.create]}>
        <PageContentLayout>
        <RBreadcrumb title={t("autosave.title")}>
          <RBreadcrumb.Item to="/places">{t("list.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Item to="/places/new">{t("create.title")}</RBreadcrumb.Item>
          <RBreadcrumb.Current>{t("autosave.title")}</RBreadcrumb.Current>
        </RBreadcrumb>
        <Row>
        <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title={t("autosave.table.title")}
                  subtitle={t("autosave.table.subtitle")}
                  total={fields?.length ?? 0}
                  filteredTotal={fields?.length ?? 0}
                />
              </CardHeader>
              <CardBody>
                <RTable columns={columns} rows={fields ? fields.map(f => ({
                    key: f.key,
                    name: getTitle(f.value)
                })) : []} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        </PageContentLayout>
    </ClaimGuardLayout>
}

export { PlaceTemplateView as Component };
