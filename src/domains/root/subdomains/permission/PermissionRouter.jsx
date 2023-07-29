export default [
  {
    path: "perm-logs",
    lazy: () => import("./views/PermissionLogView.jsx"),
  },
  {
    path: "user-perms/:userUUID",
    lazy: () => import("./views/UserPermissionListView.jsx"),
  },
];
