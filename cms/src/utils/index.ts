import { env } from '@/utils/env';
import { applicationVersion } from '@/utils/constants';
import { defaultLocale, Locale } from '@/utils/locale';
import { isEmpty } from 'lodash-es';
import { getI18n } from '@/i18n';

/**
 * 获取版本号
 */
export const getApplicationVersion = () => {
    return applicationVersion;
};

/**
 * 获取应用标题
 */
export const getApplicationTitle = () => {
    if (isEmpty(env.title)) {
        const i18n = getI18n();
        return i18n.t('title', { ns: 'common' });
    } else {
        return env.title;
    }
};

/**
 * 输出日志
 */
export function pop(text: any): void {
    if (env.debug.enabled) {
        alert(text);
    }
}

/**
 * 输出日志
 */
export function log(log: any): void {
    if (env.debug.enabled) {
        console.log(log);
    }
}

/**
 * 获取浏览器语言
 */
export const getLocale = (): Locale => {
    return getBrowserLocale();
};

/**
 * 获取浏览器语言
 */
export const getBrowserLocale = (): Locale => {
    let locale;
    switch (navigator.language.toLowerCase()) {
        case 'zh-tw':
            locale = Locale.ZH_TW;
            break;
        case 'zh-hk':
            locale = Locale.ZH_TW;
            break;
        case 'zh-cn':
            locale = Locale.ZH_CN;
            break;
        default:
            locale = defaultLocale;
            break;
    }
    return locale;
};

/**
 * 默认用户登录凭证，方便开发调试用
 */
export const credentials = env.debug.enabled
    ? {
          username: 'admin',
          password: 'Admin@123456',
      }
    : {};
