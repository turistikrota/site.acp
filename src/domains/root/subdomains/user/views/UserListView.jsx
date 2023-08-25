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

  const onNext = (page) => {
    console.log("page::", page);
    setPage(page);
  };

  const onPrev = (page) => {
    console.log("page::", page);
    setPage(page);
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
      </Container>
    </div>
  );
};

export { UserListView as Component };
