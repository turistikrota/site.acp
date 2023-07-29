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
import { useDayJS } from "@/utils/dayjs";
import { Badge } from "reactstrap";

const PlaceFeatureListView = () => {
  const { data, isLoading } = useQuery(apiUrl(Services.Place, "/feature/all"), {
    cache: true,
  });
  const { t, i18n } = useTranslation("place-features");
  const dayjs = useDayJS(i18n.language);
  useMeta(t("list.title"));

  const columns = useMemo(
    () => [
      {
        Header: t("list.cols.icon"),
        accessor: "icon",
        Cell: ({ cell: { value } }) => <span>{value}</span>,
      },
      {
        Header: t("list.cols.title"),
        accessor: `translations.${i18n.language}.title`,
        Cell: ({ cell: { value } }) => value,
      },
      {
        Header: t("list.cols.translations"),
        accessor: "translations",
        Cell: ({ cell: { value } }) => Object.keys(value).join(", "),
      },
      {
        Header: t("list.cols.active"),
        accessor: "isActive",
        Cell: ({ cell: { value } }) => (
          <h5>
            <Badge color={value ? "success" : "danger"}>
              {value ? "Aktif" : "Pasif"}
            </Badge>
          </h5>
        ),
      },
      {
        Header: t("list.cols.isDeleted"),
        accessor: "isDeleted",
        Cell: ({ cell: { value } }) => (
          <h5>
            <Badge color={value ? "danger" : "success"}>
              {value ? "Silindi" : "Aktif"}
            </Badge>
          </h5>
        ),
      },
      {
        Header: t("list.cols.date"),
        accessor: "updatedAt",
        Cell: ({ cell: { value } }) => (
          <span>{dayjs(value).format("DD MMMM YYYY, HH:mm")}</span>
        ),
      },
      {
        Header: t("list.cols.actions"),
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
        <RBreadcrumb title={t("list.title")}>
          <RBreadcrumb.NewButton to="/places/features/new">
            {t("list.new")}
          </RBreadcrumb.NewButton>
        </RBreadcrumb>
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
