export default [
    {
        path: "listing",
        lazy: () => import("./views/ListingListView.jsx")
    },
    {
        path: "listing/:uuid",
        lazy: () => import("./views/ListingDetailView.jsx")
    }
]