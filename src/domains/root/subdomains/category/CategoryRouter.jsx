export default [
    {
      path: "categories",
      lazy: () => import("./views/CategoryListView.jsx"),
    },
    {
      path: "categories/new",
      lazy: () => import("./views/CategoryCreateView.jsx"),
    },
    {
      path: "categories/:uuid",
      lazy: () => import("./views/CategoryEditView.jsx"),
    },
  ];
  