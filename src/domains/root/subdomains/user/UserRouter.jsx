export default [
  {
    path: "users",
    lazy: () => import("./views/UserListView.jsx"),
  },
];
