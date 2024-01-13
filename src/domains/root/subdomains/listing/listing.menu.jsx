import { Roles } from "@/config/roles";

export const ListingMenuItems = [
    {
        icon: "bx bx-list-check",
        title: "listings",
        to: "/listing",
        roles: [Roles.admin, Roles.Listing.super, Roles.Listing.view],
    }
]