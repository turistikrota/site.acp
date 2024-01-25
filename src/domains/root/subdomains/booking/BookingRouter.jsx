export default [
    {
        path: "bookings",
        lazy: () => import("./views/BookingListView.jsx")
    },
    {
        path: "bookings/:uuid",
        lazy: () => import("./views/BookingDetailView.jsx")
    }
]