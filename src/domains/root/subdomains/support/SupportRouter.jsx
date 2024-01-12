export default [
    {
        path: "support/feedbacks",
        lazy: () => import("./views/SupportFeedbackListView.jsx")
    },
    {
        path: "support/contacts",
        lazy: () => import("./views/SupportContactListView.jsx")
    }
]