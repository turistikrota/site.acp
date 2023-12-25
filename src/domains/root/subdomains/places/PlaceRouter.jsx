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
    path: "places/templates",
    lazy: () => import("./views/PlaceAutosaveView.jsx"),
  },
  {
    path: "places/features",
    lazy: () => import("./views/feature/PlaceFeatureListView.jsx"),
  },
  {
    path: "places/features/new",
    lazy: () => import("./views/feature/PlaceFeatureCreateView.jsx"),
  },
  {
    path: "places/features/:uuid",
    lazy: () => import("./views/feature/PlaceFeatureEditView.jsx"),
  },
  {
    path: "places/:uuid",
    lazy: () => import("./views/PlaceEditView.jsx"),
  },
];
