import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function RootLayoutProfileDropdown() {
  const account = useSelector((state) => state.account.current);
  const [menu, setMenu] = useState(false);
  return (
    <Dropdown
      isOpen={menu}
      toggle={() => setMenu(!menu)}
      className="d-inline-block"
    >
      <DropdownToggle
        className="btn header-item "
        id="page-header-user-dropdown"
        tag="button"
      >
        <span className="d-none d-xl-inline-block ms-2 me-1">
          {account.email}
        </span>
        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownItem tag="a" href="/profile">
          {" "}
          <i className="bx bx-user font-size-16 align-middle me-1" />
          Profile
        </DropdownItem>
        <DropdownItem tag="a" href="/crypto-wallet">
          <i className="bx bx-wallet font-size-16 align-middle me-1" />
          My Wallet
        </DropdownItem>
        <DropdownItem tag="a" href="#">
          <span className="badge bg-success float-end">11</span>
          <i className="bx bx-wrench font-size-16 align-middle me-1" />
          Settings
        </DropdownItem>
        <DropdownItem tag="a" href="auth-lock-screen">
          <i className="bx bx-lock-open font-size-16 align-middle me-1" />
          Lock screen
        </DropdownItem>
        <div className="dropdown-divider" />
        <Link to="/logout" className="dropdown-item">
          <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
          <span>Logout</span>
        </Link>
      </DropdownMenu>
    </Dropdown>
  );
}
