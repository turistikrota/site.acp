export default [
    {
        path: "help",
        lazy: () => import("./views/HelpArticleListView.jsx")
    },
    {
        path: "help/faqs",
        lazy: () => import("./views/HelpFaqListView.jsx")
    },
    {
        path: "help/faqs/new",
        lazy: () => import("./views/HelpFaqCreateView.jsx")
    },
    {
        path: "help/faqs/:uuid",
        lazy: () => import("./views/HelpFaqEditView.jsx")
    },
    {
        path: "help/categories",
        lazy: () => import("./views/HelpCategoryListView.jsx")
    },
    {
        path: "help/categories/new",
        lazy: () => import("./views/HelpCategoryCreateView.jsx")
    },
    {
        path: "help/categories/:uuid",
        lazy: () => import("./views/HelpCategoryEditView.jsx")
    },
    {
        path: "help/new",
        lazy: () => import("./views/HelpArticleCreateView.jsx")
    },
    {
        path: "help/:uuid",
        lazy: () => import("./views/HelpArticleEditView.jsx")
    }
]