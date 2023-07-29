import React from "react";
import AuthenticationLayout from "../auth/AuthLayout";
import RootLayoutHeader from "./layout/RootLayoutHeader";
import RootLayoutSidebar from "./layout/RootLayoutSidebar";
import RootLayoutFooter from "./layout/RootLayoutFooter";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <AuthenticationLayout>
      <div id="layout-wrapper">
        <RootLayoutHeader />
        <RootLayoutSidebar isMobile={isMobile} />
        <div className="main-content">
          <Outlet />
        </div>
        <RootLayoutFooter />
      </div>
    </AuthenticationLayout>
  );
};

export default RootLayout;
