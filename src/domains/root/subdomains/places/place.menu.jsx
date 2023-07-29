import { AllPlaceRoles, Roles } from "@/config/roles";

export const PlaceMenuItems = [
  {
    icon: "bx bx-map",
    title: "places.main",
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
    ],
  },
];
