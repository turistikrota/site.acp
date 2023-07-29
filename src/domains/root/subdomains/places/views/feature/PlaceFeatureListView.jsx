import React from "react";
import { Roles } from "@/config/roles";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import RBreadcrumb from "@/components/Kit/RBreadcrumb";
import { useQuery } from "@/hooks/query";
import { Services, apiUrl } from "@/config/service";
import { Card } from "reactstrap";
import { CardHeader } from "reactstrap";
import RTable from "@/components/Kit/RTable";
import { CardBody } from "reactstrap";
import ContentLoader from "@/components/Kit/ContentLoader";
import { useMeta } from "@/utils/site";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Button } from "reactstrap";

const PlaceFeatureListView = () => {
  const { data, isLoading } = useQuery(apiUrl(Services.Place, "/feature/all"), {
    cache: true,
  });
  const { t } = useTranslation("place-features");
  useMeta(t("list.title"));

  const columns = useMemo(
    () => [
      {
        Header: "Ikon",
        accessor: "icon",
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: "Çeviriler",
        accessor: "translations",
        Cell: ({ cell: { value } }) => Object.keys(value).join(", "),
      },
      {
        Header: "Yayın",
        accessor: "isActive",
        Cell: ({ cell: { value } }) => <span>{value ? "Aktif" : "Pasif"}</span>,
      },
      {
        Header: "Silinme Durumu",
        accessor: "isDeleted",
        Cell: ({ cell: { value } }) => (
          <span>{value ? "Silinmiş" : "Aktif"}</span>
        ),
      },
      {
        Header: "Tarih",
        accessor: "updatedAt",
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: "İşlemler",
        accessor: "uuid",
        Cell: ({ cell: { value } }) => (
          <a href={`/places/features/${value}`}>
            <Button color="primary">Düzenle</Button>
          </a>
        ),
      },
    ],
    []
  );
  if (isLoading) return <ContentLoader />;

  return (
    <ClaimGuardLayout
      pageName={t("list.title")}
      roles={[
        Roles.admin,
        Roles.Places.Features.all,
        Roles.Places.Features.list,
      ]}
    >
      <PageContentLayout>
        <RBreadcrumb title={t("list.title")}></RBreadcrumb>
        <Card className="r-card">
          <CardHeader>
            <RTable.Title
              title={t("list.table.title")}
              subtitle={t("list.table.subtitle")}
              total={data?.length}
              filteredTotal={data?.length}
            />
          </CardHeader>
          <CardBody>
            <RTable columns={columns} rows={data ?? []} />
          </CardBody>
        </Card>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { PlaceFeatureListView as Component };
