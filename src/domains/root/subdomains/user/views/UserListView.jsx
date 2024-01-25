import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import { useDayJS } from "@/utils/dayjs";
import { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Row,
} from "reactstrap";

const UserListView = () => {
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

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrev = () => {
    setPage(page - 1);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title="Kullanıcılar"
                  subtitle="Bu tabloda kullanıcılar listelenmektedir."
                  total={data?.total}
                  filteredTotal={data?.filteredTotal}
                />
              </CardHeader>
              <CardBody>
                <RTable columns={columns} rows={data?.list ?? []} />
              </CardBody>
              <CardFooter>
                <RTable.Pagination
                  isPrev={data?.isPrev}
                  isNext={data?.isNext}
                  current={page}
                  total={data?.total > 0 ? Math.ceil(data?.total / 10) : 1}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export { UserListView as Component };
