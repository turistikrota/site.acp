import { Roles } from "@/config/roles";

export const PaymentMenuItems = [
    {
        icon: "bx bx-credit-card",
        title: "payments",
        to: "/payments",
        roles: [Roles.admin, Roles.Payment.list]
    }
]