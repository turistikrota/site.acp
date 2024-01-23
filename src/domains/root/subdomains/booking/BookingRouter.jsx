export default [
    {
        path: "bookings",
        lazy: () => import("./views/BookingListView.jsx")
    },
    {
        path: "bookings/:id",
        lazy: () => import("./views/BookingDetailView.jsx")
    }
]