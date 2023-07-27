import React from "react";
import { Link } from "react-router-dom";
import RootLayoutSidebarContent from "./RootLayoutSidebarContent";

export default function RootLayoutSidebar() {
  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box">
        <Link to="/" className="logo d-block">
          <img
            src="logo.svg"
            width={"100%"}
            style={{
              fontFamily: "MyriadPro-Regular, 'Myriad Pro'",
            }}
          />
        </Link>
      </div>
      <div data-simplebar className="h-100">
        <RootLayoutSidebarContent />
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
}
