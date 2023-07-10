import type { MenuProps, ThemeConfig } from 'antd';
import { App, ConfigProvider, message, theme as AntdTheme } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import zhCnProvider from 'antd/es/locale/zh_CN';
import zhTwProvider from 'antd/es/locale/zh_TW';
import enUsProvider from 'antd/es/locale/en_US';
import { useRootSelector } from '@/store';
import { Locale } from '@/utils/locale';
import { defaultTheme, Theme, themes } from '@/utils/theme';

export const antdLocalProvider = {
    [Locale.ZH_CN]: zhCnProvider,
    [Locale.ZH_TW]: zhTwProvider,
    [Locale.EN_US]: enUsProvider,
};

export type AntdConfigProviderProps = {
    children: React.ReactNode;
};

export const AntdConfigProvider: FC<AntdConfigProviderProps> = ({ children }) => {
    const { direction, locale, theme, dark } = useRootSelector((state) => state.app);
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({});

    useEffect(() => {
        setThemeConfig(getAntdTheme(theme, dark));
    }, [theme, dark]);

    return (
        <ConfigProvider theme={themeConfig} direction={direction} locale={antdLocalProvider[locale]}>
            <App className="app-root">{children}</App>
        </ConfigProvider>
    );
};

/**
 * 修改主题
 */
export const getAntdTheme = (theme: Theme = defaultTheme, dark = false): ThemeConfig => {
    const t = themes.find((element) => element.theme === theme);
    return {
        token: {
            colorPrimary: t.primaryColor,
        },
        algorithm: dark ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
    };
};

/**
 * 修改主题
 */
export const changeAntdTheme = (theme: Theme = defaultTheme) => {
    const t = themes.find((element) => element.theme === theme);
    ConfigProvider.config({
        theme: {
            primaryColor: t.primaryColor,
        },
    });
};

type MenuItem = Required<MenuProps>['items'][number];

export const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
};

/**
 * 弹出提示信息
 */
export const toast = async (content: string): Promise<void> => {
    message.info(content);
};
