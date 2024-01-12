import { AllCategoryRoles, Roles } from "@/config/roles";

export const CategoryMenuItems = [
  {
    icon: "bx bx-category",
    title: "categories.main",
    defaultOpen: true,
    roles: [Roles.admin, AllCategoryRoles],
    children: [
      {
        title: "categories.list",
        to: "/categories",
        roles: [Roles.admin, Roles.Categories.any, Roles.Categories.list],
      },
      {
        title: "categories.create",
        to: "/categories/new",
        roles: [Roles.admin, Roles.Categories.any, Roles.Categories.create],
      },
    ],
  },
];
