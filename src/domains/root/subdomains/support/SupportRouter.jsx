export default [
    {
        path: "support/feedbacks",
        lazy: () => import("./views/SupportFeedbackListView.jsx")
    },
    {
        path: "support/contacts",
        lazy: () => import("./views/SupportContactListView.jsx")
    },
    {
        path: "support",
        lazy: () => import("./views/SupportTicketListView.jsx")
    },
    {
        path: "support/:uuid",
        lazy: () => import("./views/SupportTicketDetailView.jsx")
    }
]