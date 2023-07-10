import { SWRConfig, SWRConfiguration } from 'swr';
import React, { FC, PropsWithChildren } from 'react';
import { log } from '@/utils';

export const AppSwrConfig: SWRConfiguration = {
    revalidateOnFocus: false,
};

export type AppSwrConfigProviderProps = PropsWithChildren<{}>;

export const AppSwrConfigProvider: FC<AppSwrConfigProviderProps> = ({ children }: AppSwrConfigProviderProps) => {
    log(`AppSwrConfigProvider initialize.`);
    return <SWRConfig value={AppSwrConfig}>{children}</SWRConfig>;
};
