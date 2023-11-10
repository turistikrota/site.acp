import { AllAppRoles, Roles } from "@/config/roles";
import { PermissionMenuItems } from "~subdomains/permission/permission.menu";
import { PlaceMenuItems } from "~subdomains/places/place.menu";
import { CategoryMenuItems } from "../subdomains/category/category.menu";
import { OwnerMenuItems } from "../subdomains/owner/owner.menu";
import { UploadMenuItems } from "../subdomains/upload/upload.menu";
import { UserMenuItems } from "../subdomains/user/user.menu";

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
    roles: [Roles.admin, AllAppRoles],
  },
  ...OwnerMenuItems,
  ...CategoryMenuItems,
  ...PlaceMenuItems,
  ...UserMenuItems,
  ...UploadMenuItems,

  {
    divider: true,
    title: "menus.other",
    roles: [Roles.admin, AllAppRoles],
  },
  ...PermissionMenuItems,
];
