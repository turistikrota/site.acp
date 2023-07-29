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
    path: "places/features",
    lazy: () => import("./views/feature/PlaceFeatureListView.jsx"),
  },
  {
    path: "places/features/:uuid",
    lazy: () => import("./views/feature/PlaceFeatureEditView.jsx"),
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
