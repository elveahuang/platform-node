import { log } from '@/utils';

/**
 * 深色模式策略枚举
 */
export enum DarkStrategy {
    AUTO = 'auto',
    DARK = 'dark',
    LIGHT = 'light',
}

/**
 * 深色模式策略类型
 */
export type DarkStrategyType = {
    strategy: DarkStrategy;
    title: string;
    label: string;
    description: string;
};

/**
 * 默认语言
 */
export const defaultDarkStrategy = DarkStrategy.LIGHT;

/**
 * 内置语言
 */
export const darkStrategies: Array<DarkStrategyType> = [
    {
        strategy: DarkStrategy.AUTO,
        title: '跟随系统',
        label: 'common.label_dark_strategy_auto',
        description: '跟随系统',
    },
    {
        strategy: DarkStrategy.DARK,
        title: '深色模式',
        label: 'common.label_dark_strategy_dark',
        description: '深色模式',
    },
    {
        strategy: DarkStrategy.LIGHT,
        title: '浅色模式',
        label: 'common.label_dark_strategy_light',
        description: '跟随系统',
    },
];

/**
 * 获取深色主题策略
 */
export const getDarkStrategyLabel = (dark: DarkStrategy | string): string => {
    const t = darkStrategies.find((t) => t.strategy === dark);
    if (t) {
        return t.label;
    }
    return getDarkStrategyLabel(defaultDarkStrategy);
};

/**
 * 获取深色主题策略
 */
export const getDarkStrategy = (dark: DarkStrategy | string): DarkStrategy => {
    const t = darkStrategies.find((t) => t.strategy === dark);
    if (t) {
        return t.strategy;
    }
    return defaultDarkStrategy;
};

/**
 * 根据策略获取黑色主题的值
 * 1. 浅色 - 直接返回false
 * 2. 黑色 - 直接返回true
 * 3. 自动 - 根据当前浏览器设置
 */
export const getDarkThemeValue = (strategy: DarkStrategy | string) => {
    const darkStrategy = getDarkStrategy(strategy);
    if (DarkStrategy.LIGHT === darkStrategy) {
        return false;
    } else if (DarkStrategy.DARK === darkStrategy) {
        return true;
    } else if (DarkStrategy.AUTO === darkStrategy) {
        const mql: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        return mql.matches;
    }
};

/**
 * 设置黑色主题
 */
export const setDarkTheme = (dark: boolean) => {
    log(`Dark theme - ${dark}`);
    if (dark) {
        if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
        }
        if (!document.body.classList.contains('dark')) {
            document.body.classList.add('dark');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
        }
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
        }
    }
};
