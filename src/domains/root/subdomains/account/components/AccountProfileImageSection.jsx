import RTable from "@/components/Kit/RTable"

const AccountProfileImageSection = ({
    userName
}) => {
    return <div className="d-flex justify-content-center align-items-center">
        <RTable.UserCard name={userName} />
    </div>
}

export default AccountProfileImageSection