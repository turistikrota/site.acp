import { Roles } from "@/config/roles";

export const BookingMenuItems = [
    {
        icon: "bx bx-calendar",
        title: "bookings",
        to: "/bookings",
        roles: [Roles.admin, Roles.Booking.super, Roles.Booking.list]
    }
]