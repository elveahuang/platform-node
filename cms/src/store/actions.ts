import { loginApi, LoginApiParams, LoginApiResult, userInfoApi, UserInfoApiResult } from '@/api/auth';
import { Dispatch } from 'redux';
import { setAccessToken, setRefreshToken, setUser } from '@/store/user';
import { log } from '@/utils';
import { ApiResponse } from '@/types';
import { InitializeApiResult } from '@/types/common';
import { initializeApi } from '@/api';
import { initialize } from '@/store/app';
import { isEmpty } from 'lodash-es';

export const initializeAsync = () => async (dispatch: Dispatch) => {
    log(`Action initializeAsync.`);
    const response: ApiResponse<InitializeApiResult> = await initializeApi();
    dispatch(initialize());
    return response.data;
};

export const getUserInfoAsync = (accessToken: string) => async (dispatch: Dispatch) => {
    log(`Action getUserInfoAsync.`);
    if (!isEmpty(accessToken)) {
        const response: ApiResponse<UserInfoApiResult> = await userInfoApi();
        dispatch(setUser(response.data.user));
        return response.data;
    }
};

export const loginAsync = (params: LoginApiParams) => async (dispatch: Dispatch) => {
    log(`loginAsync...`);
    return new Promise<LoginApiResult>((resolve, reject) => {
        loginApi(params)
            .then(async (result) => {
                await dispatch(setAccessToken(result.access_token));
                await dispatch(setRefreshToken(result.refresh_token));
                resolve(result);
            })
            .catch(() => {
                reject();
            });
    });
};
