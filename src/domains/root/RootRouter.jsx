import RootLayout from "./RootLayout";
import PermissionRouter from "./subdomains/permission/PermissionRouter";
import PlaceRouter from "./subdomains/places/PlaceRouter";
import UserRouter from "./subdomains/user/UserRouter";

export default {
  path: "/",
  element: <RootLayout />,
  children: [
    ...PlaceRouter,
    ...PermissionRouter,
    ...UserRouter,
    {
      path: "",
      lazy: () => import("./views/RootDashboardView.jsx"),
    },
  ],
};
