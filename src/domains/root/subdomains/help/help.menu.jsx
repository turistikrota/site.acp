import { AllHelpRoles, Roles } from "@/config/roles";

export const HelpMenuItems = [
  {
    icon: "bx bx-help-circle",
    title: "help.main",
    defaultOpen: false,
    roles: [Roles.admin, ...AllHelpRoles],
    children: [
      {
        title: "help.list",
        to: "/help",
        roles: [
          Roles.admin,
          Roles.Help.Super,
          Roles.Help.Article.super,
          Roles.Help.Article.list,
        ],
      },
      {
        title: "help.faqs",
        to: "/help/faqs",
        roles: [
          Roles.admin,
          Roles.Help.Super,
          Roles.Help.Faq.super,
          Roles.Help.Faq.list,
        ],
      },
      {
        title: "help.categories",
        to: "/help/categories",
        roles: [
          Roles.admin,
          Roles.Help.Super,
          Roles.Help.Category.super,
          Roles.Help.Category.list,
        ],
      },
    ],
  },
];
