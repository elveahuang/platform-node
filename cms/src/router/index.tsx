import React, { FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { isEqual } from 'lodash-es';
import { log } from '@/utils';

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * 官方推荐方式
 * ---------------------------------------------------------------------------------------------------------------------
 */

export class RouterConfig {
    mode?: string = 'history';
    base?: string = '';
    routes?: RouteObject[] = [];
    customWhiteList?: Array<string> = [];
}

export let router: ReturnType<typeof createBrowserRouter>;

export const setupRouter = async (config: RouterConfig) => {
    log(`Router initialize.`);
    if (isEqual(config.mode, 'hash')) {
        router = createHashRouter(config.routes, {
            basename: config.base + '#/',
        });
    } else {
        router = createBrowserRouter(config.routes, {
            basename: config.base,
        });
    }
};

export type RouterProviderProps = React.PropsWithChildren<{}>;

export const AppRouterProvider: FC<RouterProviderProps> = () => {
    log(`AppRouterProvider initialize.`);
    return <RouterProvider router={router} />;
};

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * 路由权限包装
 * ---------------------------------------------------------------------------------------------------------------------
 */

export type RouteWrapperProps = React.PropsWithChildren<{
    name?: string;
    authority?: string | string[];
    element?: React.ReactNode | null;
}>;

export const RouteWrapper: FC<RouteWrapperProps> = (props: RouteWrapperProps) => {
    return <>{props.element}</>;
};
