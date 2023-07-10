import { isEqual } from 'lodash-es';

declare type Environment = {
    /**
     * 环境名称
     */
    mode: string;
    /**
     * 应用名称
     */
    title: string;
    /**
     * 默认语言
     */
    locale: string;
    /**
     * 服务器地址
     */
    server: string;
    /**
     * Mock
     */
    mock: {
        enabled: boolean;
    };
    /**
     * Debug
     */
    debug: {
        enabled: boolean;
    };
    /**
     * Console
     */
    console: {
        enabled: boolean;
    };
    /**
     * 路由设置
     */
    router: {
        mode: string;
        base: string;
    };
};

/**
 * 环境配置
 */
export const env: Environment = {
    mode: import.meta.env.VITE_APP_MODE ?? 'development',
    title: import.meta.env.VITE_APP_TITLE ?? '',
    locale: import.meta.env.VITE_APP_LOCALE ?? '',
    server: import.meta.env.VITE_APP_SERVER ?? '',
    debug: {
        enabled: isEqual(import.meta.env.VITE_APP_DEBUG_ENABLED, 'true'),
    },
    mock: {
        enabled: isEqual(import.meta.env.VITE_APP_MOCK_ENABLED, 'true'),
    },
    console: {
        enabled: isEqual(import.meta.env.VITE_APP_CONSOLE_ENABLED, 'true'),
    },
    router: {
        mode: import.meta.env.VITE_APP_ROUTER_MODE ?? 'history',
        base: import.meta.env.VITE_APP_BASE ?? '',
    },
};

export default env;
