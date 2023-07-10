import React, { FC } from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { toLower } from 'lodash-es';
import { defaultLocale, Locale } from '@/utils/locale';
import { log } from '@/utils';

export const loadCommonMessages = async (locale: string) => {
    const messages = await import(`./locales/${toLower(locale)}/common.json`);
    return messages.default ?? {};
};

export const loadMessages = async (locale: string) => {
    return {
        common: await loadCommonMessages(locale),
    };
};

export const defaultNameSpace = 'common';

export const setI18nextLocale = async (locale: Locale) => {
    i18n.changeLanguage(locale).then();
};

export const setI18nextMessages = async (locale: Locale) => {
    log(locale);
};

export const setupI18n = async (locale: Locale = defaultLocale) => {
    log(`I18n initialize.`);
    const messages: Record<string, any> = {
        [Locale.ZH_CN]: await loadMessages(Locale.ZH_CN),
        [Locale.ZH_TW]: await loadMessages(Locale.ZH_TW),
        [Locale.EN_US]: await loadMessages(Locale.EN_US),
    };
    await i18n.use(initReactI18next).init({
        resources: messages,
        lng: locale,
        fallbackLng: defaultLocale,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });
};

export type AppIntlProviderProps = {
    children: React.ReactNode;
};

export const AppIntlProvider: FC<AppIntlProviderProps> = ({ children }) => {
    log(`AppIntlProvider initialize.`);
    return (
        <I18nextProvider defaultNS={defaultNameSpace} i18n={i18n}>
            {children}
        </I18nextProvider>
    );
};

export const getI18n = () => {
    return i18n;
};

export { i18n };
