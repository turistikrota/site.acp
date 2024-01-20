export default [
    {
        path: 'account',
        lazy: () => import('./views/AccountListView.jsx')
    },
    {
        path: 'account/:uuid',
        lazy: () => import('./views/AccountDetailView.jsx')
    }
]