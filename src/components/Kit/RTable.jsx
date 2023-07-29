import React from "react";
import { useTranslation } from "react-i18next";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Button, Col, Row, Table } from "reactstrap";

const Title = ({ title, subtitle, total = 0, filteredTotal = 0 }) => {
  const { t } = useTranslation("table");
  return (
    <Row className="justify-content-between">
      <Col lg="9">
        <h3 className="mb-1 text-muted">{title}</h3>
        <h5 className="mb-1">{subtitle}</h5>
      </Col>
      <Col lg="3" className="d-flex justify-content-end">
        {" "}
        <p className="text-muted">{t("length", { total, filteredTotal })}</p>
      </Col>
    </Row>
  );
};

const Pagination = ({ onPrev, onNext, isPrev = false, isNext = false }) => {
  const { t } = useTranslation("table");
  return (
    <Row className="justify-content-between align-items-center">
      <Col lg="6">
        <Button color="primary" onClick={() => onPrev()} disabled={!isPrev}>
          <i className="bx bx-left-arrow-alt"></i>
          {t("prev")}
        </Button>
      </Col>
      <Col lg="6" className="d-flex justify-content-end items-center">
        <Button color="primary" onClick={() => onNext()} disabled={!isNext}>
          <i className="bx bx-right-arrow-alt"></i>
          {t("next")}
        </Button>
      </Col>
    </Row>
  );
};

function RTable({ columns, rows, pageSize = 50 }) {
  const { t } = useTranslation("table");
  const { headerGroups, page, getTableProps, getTableBodyProps } = useTable(
    {
      columns,
      data: rows,
      initialState: {
        pageIndex: 0,
        pageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <div className="table-responsive react-table">
      <Table bordered hover {...getTableProps()}>
        <thead className=" table-nowrap">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>
                  <div className="mb-2" {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center align-middle"
                style={{
                  height: "150px",
                }}
              >
                {t("empty")}
              </td>
            </tr>
          )}
          {page.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

RTable.Title = Title;
RTable.Pagination = Pagination;

export default RTable;
