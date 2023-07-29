/*
{
  to: string,
  title: string,
  icon: string,
  roles: [string]
  children: [
    to: string,
    title: string,
    roles: [string]
  ]
}
*/
import { AllAppRoles, Roles } from "@/config/roles";
import { PlaceMenuItems } from "../subdomains/places/place.menu";

export const menuItems = [
  {
    icon: "bx bxs-dashboard",
    title: "dashboard.main",
    defaultOpen: true,
    children: [
      {
        title: "dashboard.default",
        to: "/",
        roles: [Roles.admin],
      },
    ],
    roles: [Roles.admin],
  },
  {
    divider: true,
    title: "menus.apps",
    roles: [AllAppRoles],
  },
  ...PlaceMenuItems,
];
