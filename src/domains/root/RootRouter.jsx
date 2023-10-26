import RootLayout from "./RootLayout";
import CategoryRouter from "./subdomains/category/CategoryRouter";
import PermissionRouter from "./subdomains/permission/PermissionRouter";
import PlaceRouter from "./subdomains/places/PlaceRouter";
import UploadRouter from "./subdomains/upload/UploadRouter";
import UserRouter from "./subdomains/user/UserRouter";

export default {
  path: "/",
  element: <RootLayout />,
  children: [
    ...CategoryRouter,
    ...PlaceRouter,
    ...PermissionRouter,
    ...UserRouter,
    ...UploadRouter,
    {
      path: "",
      lazy: () => import("./views/RootDashboardView.jsx"),
    },
  ],
};
