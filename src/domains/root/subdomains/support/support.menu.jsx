import { AllSupportRoles, Roles } from "@/config/roles";

export const SupportMenuItems = [
  {
    icon: "bx bx-support",
    title: "support.title",
    roles: [Roles.admin, AllSupportRoles],
    defaultOpen: false,
    children: [
      {
        title: "support.feedbacks",
        to: "/support/feedbacks",
        roles: [Roles.admin, Roles.Support.Feedback.list],
      },
      {
        title: "support.contacts",
        to: "/support/contacts",
        roles: [Roles.admin, Roles.Support.Contact.list],
      },
      {
        title: "support.tickets",
        to: "/support",
        roles: [Roles.admin, Roles.Support.list],
      },
    ],
  },
];
