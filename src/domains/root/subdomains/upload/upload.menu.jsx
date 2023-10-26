import { Roles } from "@/config/roles";

export const UploadMenuItems = [
  {
    icon: "bx bx-upload",
    title: "upload",
    to: "/upload",
    roles: [Roles.admin, Roles.Cdn.upload],
  },
];
