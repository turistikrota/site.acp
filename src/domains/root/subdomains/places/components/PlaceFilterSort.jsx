import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

export default function PlaceFilterSort() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
        <DropdownToggle tag="button" className="btn bg-header">
          Order <i className="mdi mdi-chevron-down" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Asc</DropdownItem>
          <DropdownItem>Desc</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
        <DropdownToggle tag="button" className="btn bg-header">
          Sort By <i className="mdi mdi-chevron-down" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem href="#">Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
