import { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import { isEqual } from 'lodash-es';
import { routes } from '@/router/routes';

/**
 * 路由实例
 */
export let router: ReturnType<typeof createRouter>;

/**
 * 路由配置
 */
export class RouterConfig {
    mode?: string = 'history';
    base?: string = '';
}

/**
 * 初始化
 */
export const setupRouter = async (app: App, config: RouterConfig) => {
    router = createRouter({
        routes: routes,
        history: isEqual(config.mode, 'hash') ? createWebHashHistory(config.base) : createWebHistory(config.base),
        scrollBehavior: () => ({ left: 0, top: 0 }),
    });
    await app.use(router);
};
