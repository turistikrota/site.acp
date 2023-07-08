import RootLayout from "./RootLayout";
import PlaceRouter from "./subdomains/places/PlaceRouter";

export default {
  path: "/",
  element: <RootLayout />,
  children: [
    ...PlaceRouter,
    {
      index: true,
      lazy: () => import("./views/RootDashboardView.jsx"),
    },
  ],
};
