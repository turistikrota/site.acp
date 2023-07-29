import { Roles } from "@/config/roles";

export const PermissionMenuItems = [
  {
    icon: "bx bxs-key",
    title: "perms",
    to: "/perm-logs",
    roles: [Roles.admin, Roles.Perms.list],
  },
];
