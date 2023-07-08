import DashboardLayout from "../layouts/dashboard";

const routes = [
  {
    path: "places",
    lazy: () => import("@/views/app/places/list.jsx"),
  },
  {
    path: "places/new",
    lazy: () => import("@/views/app/places/create.jsx"),
  },
  {
    path: "places/:uuid/edit",
    lazy: () => import("@/views/app/places/edit.jsx"),
  },
  {
    path: "places/:uuid",
    lazy: () => import("@/views/app/places/detail.jsx"),
  },
];

export default {
  path: "/",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      lazy: () => import("@/views/app/dashboard.jsx"),
    },
    ...routes,
  ],
};
