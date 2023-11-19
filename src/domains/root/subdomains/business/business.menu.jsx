import { Roles } from "@/config/roles";

export const BusinessMenuItems = [
  {
    icon: "bx bx-building-house",
    title: "businesses",
    to: "/businesses",
    roles: [Roles.admin, Roles.Business.list],
  },
];
