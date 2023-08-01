import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { usePlaceFilter, usePlaceSort } from "../hooks/place.filter";

export default function PlaceFilterSort() {
  const { t } = useTranslation("places");
  const { defaultSort, defaultOrder, orders, sorts } = usePlaceSort();
  const { query, push } = usePlaceFilter();
  const [currentSort, setCurrentSort] = useState(
    query.filter.sort || defaultSort
  );
  const [currentOrder, setCurrentOrder] = useState(
    query.filter.order || defaultOrder
  );
  const [sortOpen, setSortOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const onSortChange = (sort) => {
    setCurrentSort(sort);
    query.filter.sort = sort;
    push(query);
  };

  const onOrderChange = (order) => {
    setCurrentOrder(order);
    query.filter.order = order;
    push(query);
  };

  return (
    <>
      <Dropdown isOpen={sortOpen} toggle={() => setSortOpen(!sortOpen)}>
        <DropdownToggle tag="button" className="btn bg-header">
          {t("sort.sort-by.title")} <i className="mdi mdi-chevron-down" />
        </DropdownToggle>
        <DropdownMenu>
          {sorts.map((sort) => (
            <DropdownItem
              key={sort}
              onClick={() => onSortChange(sort)}
              active={sort === currentSort}
            >
              {t(`sort.sort-by.${sort}`)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={orderOpen} toggle={() => setOrderOpen(!orderOpen)}>
        <DropdownToggle tag="button" className="btn bg-header">
          {t("sort.order-by.title")} <i className="mdi mdi-chevron-down" />
        </DropdownToggle>
        <DropdownMenu>
          {orders.map((order) => (
            <DropdownItem
              key={order}
              onClick={() => onOrderChange(order)}
              active={order === currentOrder}
            >
              {t(`sort.order-by.${order}`)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
