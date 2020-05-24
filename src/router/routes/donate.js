const donateRoutes = [
    {
        path: '/donate',
        name: 'Donate',
        component: () => import(/* webpackChunkName: "donate" */ '@/components/Donate.vue'),
        props: {
            page: 1,
            searchBar: true
        },
        meta: {
            requiresAuth: true,
            title: "Задонатить",
        }
    },

];

export default donateRoutes