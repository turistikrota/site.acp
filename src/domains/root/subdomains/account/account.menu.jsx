import { Roles } from "@/config/roles";

export const AccountMenuItems = [
    {
        icon: "bx bxs-user-account",
        title: "account",
        to: '/account',
        roles: [Roles.admin, Roles.Account.super, Roles.Account.list]
    }
]