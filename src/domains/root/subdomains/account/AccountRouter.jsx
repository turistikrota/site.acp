export default [
    {
        path: 'account',
        lazy: () => import('./views/AccountListView.jsx')
    },
    {
        path: 'account/:nickName',
        lazy: () => import('./views/AccountDetailView.jsx')
    }
]