import { map } from "lodash";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function RPagination({
  totalPage = 0,
  page = 1,
  onPageClick = () => {},
}) {
  return (
    <Pagination className="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1">
      <PaginationItem disabled={page === 1}>
        <PaginationLink
          previous
          href="#"
          onClick={() => onPageClick(page - 1)}
        />
      </PaginationItem>
      {map(Array(totalPage), (item, i) => (
        <PaginationItem active={i + 1 === page} key={i}>
          <PaginationLink onClick={() => onPageClick(i + 1)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={page === totalPage}>
        <PaginationLink next href="#" onClick={() => onPageClick(page + 1)} />
      </PaginationItem>
    </Pagination>
  );
}
