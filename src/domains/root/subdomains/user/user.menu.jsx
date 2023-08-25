import { Roles } from "@/config/roles";

export const UserMenuItems = [
  {
    icon: "bx bx-user",
    title: "users",
    to: "/users",
    roles: [Roles.admin, Roles.Users.list],
  },
];
