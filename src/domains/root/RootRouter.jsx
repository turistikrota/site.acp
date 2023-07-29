import React from "react";
import RootLayout from "./RootLayout";
import PermissionRouter from "./subdomains/permission/PermissionRouter";
import PlaceRouter from "./subdomains/places/PlaceRouter";

export default {
  path: "/",
  element: <RootLayout />,
  children: [
    ...PlaceRouter,
    ...PermissionRouter,
    {
      path: "",
      lazy: () => import("./views/RootDashboardView.jsx"),
    },
  ],
};
