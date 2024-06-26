import { AllPlaceRoles, Roles } from "@/config/roles";

export const PlaceMenuItems = [
  {
    icon: "bx bx-map",
    title: "places.main",
    defaultOpen: true,
    roles: [Roles.admin, AllPlaceRoles],
    children: [
      {
        title: "places.list",
        to: "/places",
        roles: [Roles.admin, Roles.Places.any, Roles.Places.list],
      },
      {
        title: "places.create",
        to: "/places/new",
        roles: [Roles.admin, Roles.Places.any, Roles.Places.create],
      },
      {
        title: "places.features.list",
        to: "/places/features",
        roles: [
          Roles.admin,
          Roles.Places.Features.all,
          Roles.Places.Features.list,
        ],
      },
    ],
  },
];
