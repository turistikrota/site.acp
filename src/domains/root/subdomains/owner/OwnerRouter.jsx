export default [
  {
    path: "owners",
    lazy: () => import("./views/OwnerListView.jsx"),
  },
  {
    path: "owners/:nickName",
    lazy: () => import("./views/OwnerDetailView.jsx"),
  },
];
