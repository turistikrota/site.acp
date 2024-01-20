import RTable from "@/components/Kit/RTable";
import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

const AccountProfileAnotherSection = ({userUUID, userName}) => {
    const { t } = useTranslation("account");
    const { data, isLoading } = useQuery(
      apiUrl(Services.Account, `/admin/by-user/${userUUID}`)
    );

    if(isLoading) return <></>

    return <div>
        <h5 className="mb-4 mt-4">{t("details.another")}</h5>
        <Row className="gap-4">
        {data && data.filter(u => u.userName !== userName).map((item, idx) => <Col key={idx} xs={12} md={3}>
        <Card>
        <Link to={`/account/${item.userName}`}>
            <RTable.UserCard name={item.userName} />
        </Link>
        </Card>
        </Col>)}

        </Row>
    </div>
}

export default AccountProfileAnotherSection