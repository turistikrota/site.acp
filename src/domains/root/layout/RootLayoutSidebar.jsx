import React from "react";
import { Link } from "react-router-dom";
import RootLayoutSidebarContent from "./RootLayoutSidebarContent";
import Logo from "../../../components/Logo/Logo";

export default function RootLayoutSidebar() {
  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box">
        <Link to="/" className="logo d-block">
          <Logo />
        </Link>
      </div>
      <div data-simplebar className="h-100">
        <RootLayoutSidebarContent />
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
}
