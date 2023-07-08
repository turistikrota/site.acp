export default [
  {
    path: "places",
    lazy: () => import("./views/PlaceListView.jsx"),
  },
  {
    path: "places/new",
    lazy: () => import("./views/PlaceCreateView.jsx"),
  },
  {
    path: "places/:uuid/edit",
    lazy: () => import("./views/PlaceEditView.jsx"),
  },
  {
    path: "places/:uuid",
    lazy: () => import("./views/PlaceDetailView.jsx"),
  },
];
