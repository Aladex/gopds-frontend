const donateRoutes = [
    {
        path: '/donate',
        name: 'Donate',
        component: () => import(/* webpackChunkName: "donate" */ '@/components/Donate.vue'),
        meta: {
            requiresAuth: true,
            title: "Задонатить",
        }
    },
    {
        path: '/opds',
        name: 'Opds',
        component: () => import(/* webpackChunkName: "opds" */ '@/components/Opds.vue'),
        meta: {
            requiresAuth: true,
            title: "OPDS",
        }
    },

];

export default donateRoutes