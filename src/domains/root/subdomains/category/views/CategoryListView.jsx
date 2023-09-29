import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import PageContentLayout from "@/domains/root/layout/PageContentLayout";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import ClaimGuardLayout from "~subdomains/account/layout/ClaimGuardLayout";

const CategoryListView = () => {
  const { t } = useTranslation("categories");
  const [page, setPage] = useState(1);
  const dayjs = useDayJS();
  const { data, isLoading } = useQuery(
    apiUrl(Services.Auth, `/user-list?page=${page}`),
    {
      cache: true,
      params: {},
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => <span>{row.original.uuid}</span>,
      },
      {
        Header: "E-Posta",
        Cell: ({ row }) => <span>{row.original.email}</span>,
      },
      {
        Header: "Aktif mi?",
        Cell: ({ row }) => (
          <span>{row.original.is_active ? "Aktif" : "Pasif"}</span>
        ),
      },
      {
        Header: "Onaylı mı?",
        Cell: ({ row }) => (
          <span>{row.original.is_verified ? "Aktif" : "Pasif"}</span>
        ),
      },
      {
        Header: "Kayıt Tarihi",
        Cell: ({ row }) => (
          <span>
            {dayjs(row.original.created_at).format("DD MMMM YYYY HH:mm")}
          </span>
        ),
      },
    ],
    []
  );

  if (isLoading) return <ContentLoader />;

  const onNext = (page) => {
    console.log("page::", page);
    setPage(page);
  };

  const onPrev = (page) => {
    console.log("page::", page);
    setPage(page);
  };

  return (
    <ClaimGuardLayout
      pageName={t("list.title")}
      roles={[Roles.admin, Roles.Categories.any, Roles.Categories.list]}
    >
      <PageContentLayout>
        <Row>
          <Col xs={12}>
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title={t("list.title")}
                  subtitle={t("list.subtitle")}
                  total={data?.Total}
                  filteredTotal={data?.FilteredTotal}
                />
              </CardHeader>
              <CardBody>
                <RTable columns={columns} rows={data?.List ?? []} />
              </CardBody>
              <CardFooter>
                <RTable.Pagination
                  isPrev={data?.IsPrev}
                  isNext={data?.IsNext}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </PageContentLayout>
    </ClaimGuardLayout>
  );
};

export { CategoryListView as Component };
