import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts';
//
const Index = lazy(() => import('@/views/index'));
const About = lazy(() => import('@/views/about'));
const Login = lazy(() => import('@/views/login'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'home',
                element: <Index />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: '',
                element: <Navigate to={'home'} />,
            },
        ],
    },
];

export default routes;
