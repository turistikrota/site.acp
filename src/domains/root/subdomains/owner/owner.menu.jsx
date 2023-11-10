import { Roles } from "@/config/roles";

export const OwnerMenuItems = [
  {
    icon: "bx bx-building-house",
    title: "owners",
    to: "/owners",
    roles: [Roles.admin, Roles.Owner.list],
  },
];
