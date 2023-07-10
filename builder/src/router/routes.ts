import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'page-home',
        component: () => import('@/views/home.tsx'),
    },
];
