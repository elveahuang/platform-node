import React, { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { log } from '@/utils';

export type AppHelmetProviderProps = React.PropsWithChildren<{}>;

export const AppHelmetProvider: FC<AppHelmetProviderProps> = ({ children }) => {
    log(`AppHelmetProvider initialize.`);
    const { t } = useTranslation();
    return (
        <HelmetProvider>
            <Helmet title={t('common:title')} />
            {children}
        </HelmetProvider>
    );
};
