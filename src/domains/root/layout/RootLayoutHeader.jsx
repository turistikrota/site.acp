import Logo from "@/components/Logo/Logo";
import { Link } from "react-router-dom";
import RootLayoutProfileDropdown from "./RootLayoutProfileDropdown";

export default function RootLayoutHeader() {
  const toggleSidebar = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex w-full justify-content-between">
          <div className="d-lg-none d-md-flex justify-content-end">
            <Link to="/" className="logo">
              <Logo />
            </Link>
          </div>

          <button
            type="button"
            onClick={toggleSidebar}
            className="btn btn-sm px-3 font-size-16 header-item "
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars" />
          </button>
        </div>
        <div className="d-flex">
          {/*
          <RootLayoutNotificationDropdown />
           */}
          <RootLayoutProfileDropdown />
        </div>
      </div>
    </header>
  );
}
