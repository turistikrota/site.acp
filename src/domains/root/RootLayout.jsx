import { Outlet } from "react-router-dom";
import AuthenticationLayout from "../auth/AuthLayout";
import RootLayoutFooter from "./layout/RootLayoutFooter";
import RootLayoutHeader from "./layout/RootLayoutHeader";
import RootLayoutSidebar from "./layout/RootLayoutSidebar";

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
