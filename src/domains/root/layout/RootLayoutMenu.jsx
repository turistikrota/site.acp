import { AllAppRoles, Roles } from "@/config/roles";
import { AccountMenuItems } from "~subdomains/account/account.menu";
import { BookingMenuItems } from "~subdomains/booking/booking.menu";
import { BusinessMenuItems } from "~subdomains/business/business.menu";
import { CategoryMenuItems } from "~subdomains/category/category.menu";
import { HelpMenuItems } from "~subdomains/help/help.menu";
import { ListingMenuItems } from "~subdomains/listing/listing.menu";
import { PermissionMenuItems } from "~subdomains/permission/permission.menu";
import { PlaceMenuItems } from "~subdomains/places/place.menu";
import { SupportMenuItems } from "~subdomains/support/support.menu";
import { UploadMenuItems } from "~subdomains/upload/upload.menu";
import { UserMenuItems } from "~subdomains/user/user.menu";

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
  ...BusinessMenuItems,
  ...ListingMenuItems,
  ...BookingMenuItems,
  ...CategoryMenuItems,
  ...PlaceMenuItems,
  ...SupportMenuItems,
  ...HelpMenuItems,

  {
    divider: true,
    title: "menus.other",
    roles: [Roles.admin, AllAppRoles],
  },
  ...UserMenuItems,
  ...AccountMenuItems,
  ...UploadMenuItems,
  ...PermissionMenuItems,
];
