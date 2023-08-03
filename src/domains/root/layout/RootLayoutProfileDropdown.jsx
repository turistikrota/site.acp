import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import Spin from "sspin";

import { Services, apiUrl } from "@/config/service";
import { httpClient } from "@/http/client";
import { useAlert } from "@/utils/alert";
import { parseApiError } from "@/utils/api-error";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function RootLayoutProfileDropdown() {
  const { t } = useTranslation("common");
  const account = useSelector((state) => state.account.current);
  const alert = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(false);

  const logout = () => {
    setIsLoading(true);
    httpClient
      .post(apiUrl(Services.Auth, "/logout"), null)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data)
          return parseApiError({ error: err.response.data, alert });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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
        <Spin loading={isLoading}>
          {/*
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
           */}
          <Link to="" className="dropdown-item" onClick={() => logout()}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{t("menu.logout")}</span>
          </Link>
        </Spin>
      </DropdownMenu>
    </Dropdown>
  );
}
