import React, { useMemo } from "react";
import { useQuery } from "@/hooks/query";
import { apiUrl, Services } from "@/config/service";
import ContentLoader from "@/components/Kit/ContentLoader";
import RTable from "@/components/Kit/RTable";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";

const PermissionLogView = () => {
  const { data, isLoading } = useQuery(apiUrl(Services.Admin, "/perm"), {
    cache: true,
    method: "POST",
    params: {},
  });

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => <input type="checkbox" className="form-check-input" />,
      },
      {
        Header: "İşlem Yapan",
        Cell: ({ fromUserUUID }) => <span>{fromUserUUID}</span>,
      },
      {
        Header: "İşlem Yapılan",
        Cell: ({ toUserUUID }) => <span>{toUserUUID}</span>,
      },
      {
        Header: "İşlem",
        Cell: ({ direction }) => <span>{direction ? "Ekleme" : "Silme"}</span>,
      },
      {
        Header: "İzin",
        Cell: ({ roles }) => <span>{roles.join(", ")}</span>,
      },
      {
        Header: "Tarih",
        Cell: ({ createdAt }) => <span>{createdAt}</span>,
      },
    ],
    []
  );

  if (isLoading) return <ContentLoader />;

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Card className="r-card">
              <CardHeader>
                <RTable.Title
                  title="Yetkilendirmeler"
                  subtitle="Bu tabloda yetkilendirme geçmişi listelenmektedir."
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
                  onPrev={() => {}}
                  onNext={() => {}}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export { PermissionLogView as Component };
