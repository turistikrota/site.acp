export default [
  {
    path: "businesses",
    lazy: () => import("./views/BusinessListView.jsx"),
  },
  {
    path: "businesses/:nickName",
    lazy: () => import("./views/BusinessDetailView.jsx"),
  },
];
