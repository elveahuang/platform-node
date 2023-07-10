import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApplicationVersion, log } from '@/utils';
import { defaultTheme, setTheme, Theme } from '@/utils/theme';
import { defaultDirection, Direction } from '@/utils/direction';
import { DarkStrategy, defaultDarkStrategy } from '@/utils/dark';
import { defaultLocale, Locale } from '@/utils/locale';

export interface AppState {
    /**
     * 版本号
     */
    version: string;
    /**
     * 页面是否正在加载
     */
    loading: boolean;
    /**
     * 语言
     */
    locale: Locale;
    /**
     * 主题
     */
    theme: Theme;
    /**
     * 对齐方式
     */
    direction: Direction;
    /**
     * 深色模式策略
     */
    darkStrategy: DarkStrategy;
    /**
     * 启用深色模式
     */
    dark: boolean;
    /**
     * 左边导航侧边栏
     */
    sidebar: {
        /**
         * 是否收起
         */
        collapsed: boolean;
        /**
         * 小型化
         */
        mini: boolean;
    };
    /**
     * 右边控制侧边栏
     */
    controlSidebar: {
        /**
         * 是否收起
         */
        collapsed: boolean;
        /**
         * 小型化
         */
        mini: boolean;
    };
}

export const initialState: AppState = {
    version: getApplicationVersion(),
    loading: true,
    locale: defaultLocale,
    theme: defaultTheme,
    direction: defaultDirection,
    darkStrategy: defaultDarkStrategy,
    dark: false,
    sidebar: {
        collapsed: false,
        mini: false,
    },
    controlSidebar: {
        collapsed: false,
        mini: false,
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        /**
         * 初始化
         */
        initialize: (state: AppState) => {
            log(`Store app initialize.`);
            return state;
        },
        /**
         * 切换语言
         */
        changeLocale: (state: AppState, action: PayloadAction<Locale>) => {
            return { ...state, locale: action.payload };
        },
        /**
         * 切换语言
         */
        setDark: (state: AppState, action: PayloadAction<boolean>) => {
            return { ...state, dark: action.payload };
        },
        /**
         * 切换主题
         */
        changeTheme: (state: AppState, action: PayloadAction<Theme>) => {
            setTheme(action.payload);
            return { ...state, theme: action.payload };
        },
        /**
         * 切换对其方式
         */
        changeDirection: (state: AppState, action: PayloadAction<Direction>) => {
            return { ...state, direction: action.payload };
        },
        /**
         * 切换侧边导航栏
         */
        toggleSidebar: (state: AppState, action: PayloadAction<boolean>) => {
            state.sidebar.collapsed = action.payload;
            return state;
        },
    },
});

export const { initialize, toggleSidebar, setDark, changeLocale, changeTheme, changeDirection } = appSlice.actions;

export default appSlice.reducer;
