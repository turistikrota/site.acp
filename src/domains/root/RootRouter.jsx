import RootLayout from "./RootLayout";
import BusinessRouter from "./subdomains/business/BusinessRouter";
import CategoryRouter from "./subdomains/category/CategoryRouter";
import ListingRouter from "./subdomains/listing/ListingRouter";
import PermissionRouter from "./subdomains/permission/PermissionRouter";
import PlaceRouter from "./subdomains/places/PlaceRouter";
import SupportRouter from "./subdomains/support/SupportRouter";
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
    ...BusinessRouter,
    ...SupportRouter,
    ...ListingRouter,
    {
      path: "",
      lazy: () => import("./views/RootDashboardView.jsx"),
    },
  ],
};
