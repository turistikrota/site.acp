import React from "react";
import { useTranslation } from "react-i18next";

import { makeBusinessAvatar, makeUserAvatar } from "@/utils/cdn";
import { makeCustomSelect } from "@/utils/customSelect";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Button, CardTitle, Col, Input, Row, Table } from "reactstrap";
import InputGroup from "./InputGroup";
import styles from "./RTable.module.scss";

const Title = ({ title, subtitle, total = 0, filteredTotal = 0, withoutCount }) => {
  const { t } = useTranslation("table");
  return (
    <Row className="justify-content-between">
      <Col lg="9">
        <CardTitle className="mb-1 text-muted">{title}</CardTitle>
        <p className="card-title-desc">{subtitle}</p>
      </Col>
      {!withoutCount && <Col lg="3" className="d-flex justify-content-end">
        {" "}
        <p className="text-muted">{t("length", { total, filteredTotal })}</p>
      </Col>}
    </Row>
  );
};

const Pagination = ({ onPrev, onNext, isPrev = false, isNext = false, current = 1, total = 1 }) => {
  const { t } = useTranslation("table");
  return (
    <Row className="justify-content-between align-items-center">
      <Col lg="3">
        <Button color="primary" onClick={() => onPrev()} disabled={!isPrev}>
          <i className="bx bx-left-arrow-alt"></i>
          {t("prev")}
        </Button>
      </Col>
      <Col lg="6" className="d-flex justify-content-center">
        <p className="text-muted mb-0">
          {current} / {total}
        </p>
      </Col>
      <Col lg="3" className="d-flex justify-content-end items-center">
        <Button color="primary" onClick={() => onNext()} disabled={!isNext}>
          <i className="bx bx-right-arrow-alt"></i>
          {t("next")}
        </Button>
      </Col>
    </Row>
  );
};

const Search = ({ value, onChange, children, placeholder }) => {
  const [defaultValue, setDefaultValue] = React.useState(value)
  const {t} = useTranslation("table");
  return  <InputGroup
  label={t("search")}
>
  <Input
    type="text"
    className="form-control"
    placeholder={placeholder ? placeholder : t('search_placeholder')}
    onChange={e => {
      onChange(e.target.value);
      setDefaultValue(e.target.value)
    }}
    value={defaultValue}
  />
  {children}
</InputGroup>
}

const RSelect = ({value, onChange, options, title}) => {
  return <InputGroup
  label={title}
>
  <Select
    classNamePrefix="select2-selection"
    placeholder={title}
    title={title}
    value={value}
    options={options}
    onChange={(e) => {
      onChange(e.value);
    }}
    theme={makeCustomSelect}
  />
</InputGroup>
}

const UserCard = ({name}) => {
  return <span className={styles.user}>
    <img src={makeUserAvatar(name)} width={36} height={36} />
    <span>@{name}</span>
  </span> 
}

const BusinessCard = ({name}) => {
  return <Link to={`/businesses/${name}`} className={styles.user}>
    <img src={makeBusinessAvatar(name)} width={36} height={36} />
    <span>~{name}</span>
  </Link> 
}

const PostCard = ({title, uuid, image}) => {
  return <Link to={`/listing/${uuid}`} className={styles.post}>
    <img src={image} width={36} height={36} />
    <span>{title}</span>
  </Link>
}

function RTable({ columns, rows, pageSize = 50 }) {
  const { t } = useTranslation("table");
  const { headerGroups, prepareRow, page, getTableProps, getTableBodyProps } =
    useTable(
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
RTable.Search = Search;
RTable.Select = RSelect;
RTable.UserCard = UserCard;
RTable.BusinessCard = BusinessCard;
RTable.PostCard = PostCard;

export default RTable;
