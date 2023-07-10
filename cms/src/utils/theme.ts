import colors from 'tailwindcss/colors';

/**
 * 主题枚举
 */
export enum Theme {
    GRAY = 'gray',
    RED = 'red',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
}

/**
 * 主题类型
 */
export type ThemeType = {
    theme: Theme;
    title: string;
    label: string;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
};

/**
 * 默认主题
 */
export const defaultTheme = Theme.BLUE;

/**
 * 内置主题
 */
export const themes: Array<ThemeType> = [
    {
        theme: Theme.GRAY,
        title: 'Gray',
        label: 'common.label_theme_gray',
        primaryColor: colors.gray[800],
        secondaryColor: '',
        tertiaryColor: '',
    },
    {
        theme: Theme.RED,
        title: 'Red',
        label: 'common.label_theme_red',
        primaryColor: colors.red[800],
        secondaryColor: '',
        tertiaryColor: '',
    },
    {
        theme: Theme.YELLOW,
        title: 'Yellow',
        label: 'common.label_theme_yellow',
        primaryColor: colors.yellow[800],
        secondaryColor: '',
        tertiaryColor: '',
    },
    {
        theme: Theme.GREEN,
        title: 'Green',
        label: 'common.label_theme_green',
        primaryColor: colors.green[800],
        secondaryColor: 'blue',
        tertiaryColor: 'blue',
    },
    {
        theme: Theme.BLUE,
        title: 'Blue',
        label: 'common.label_theme_blue',
        primaryColor: colors.blue[800],
        secondaryColor: '',
        tertiaryColor: '',
    },
    {
        theme: Theme.PURPLE,
        title: 'Purple',
        label: 'common.label_theme_purple',
        primaryColor: colors.purple[800],
        secondaryColor: '',
        tertiaryColor: '',
    },
];

/**
 * 根据语言标识获取语言枚举类型
 */
export const getThemeClassName = (theme: Theme | string): string => {
    return 'app-theme-' + themes.find((t) => t.theme === theme).theme;
};

/**
 * 根据语言标识获取语言枚举类型
 */
export const getTheme = (theme: Theme | string): Theme => {
    const t = themes.find((t) => t.theme === theme);
    if (t) {
        return t.theme;
    }
    return defaultTheme;
};

/**
 * 切换主题
 */
export const setTheme = (theme: Theme = defaultTheme) => {
    const themeClassName = getThemeClassName(theme);
    themes.forEach((t) => {
        document.documentElement.classList.remove(getThemeClassName(t.theme));
        document.body.classList.remove(getThemeClassName(t.theme));
    });
    document.documentElement.classList.add(themeClassName);
    document.body.classList.add(themeClassName);
};

export default themes;
