import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler, InternalAxiosRequestConfig } from 'axios';
import { isArray, isEmpty, isFunction, merge } from 'lodash-es';
import { parse, stringify } from 'qs';
//
import storage from '@/utils/storage';
import { env } from '@/utils/env';
import { log } from '@/utils';
import { store } from '@/store';
import { refreshApi, RefreshApiResult } from '@/api/auth';
import { router } from '@/router';
import { clear, setAccessToken, setRefreshToken } from '@/store/user';
import { isEqual } from 'lodash';

/**
 * 取消请求
 */
const CancelToken = axios.CancelToken;
const cancels: Canceler[] = [];
const cancelAllRequest = (message?: string) => {
    cancels.forEach((cancel) => cancel(message));
};

/**
 * 刷新凭证，保存当前请求，等待凭证获取成功后再发送请求。
 */
let isRefreshing = false;

const requests: Array<() => void> = [];

/**
 * 超时判断
 */
const isTimeoutError = (error: AxiosError) => error.code === 'ECONNABORTED' && error.message.includes('timeout');

/**
 * 创建实例
 */
export const http = axios.create({
    timeout: 30000,
    baseURL: env.server,
    withCredentials: false,
});

/**
 * 跳转到登录页面
 */
export const gotoLogin = async (options: AxiosOptions): Promise<void> => {
    store.dispatch(clear());

    const { login = '/login' } = options;
    router.navigate(login).then();
};

/**
 * 是否是刷新凭证请求
 */
export const isRefreshTokenRequest = (config: InternalAxiosRequestConfig) => {
    log('Axios isRefreshTokenRequest.');
    if (isEqual(config?.url, '/oauth/token') && !isEmpty(config.data)) {
        const params = parse(config.data);
        return isEqual(params?.grant_type, 'refresh_token');
    }
    return false;
};

/**
 * 刷新凭证后刷新状态信息
 */
export const handleRefreshToken = async (result: RefreshApiResult) => {
    log('Axios handleRefreshToken.');
    store.dispatch(setAccessToken(result.access_token));
    store.dispatch(setRefreshToken(result.refresh_token));
};

/**
 * 处理请求失败
 */
export const handleError = async (error: AxiosError, options: AxiosOptions = {}) => {
    log('Axios handleError.');

    const toast = (message: string) => {
        if (isFunction(options?.toast)) {
            options?.toast(message);
        } else {
            alert(message);
        }
    };

    if (error && error.response) {
        if (isRefreshTokenRequest(error.response.config)) {
            gotoLogin(options).then();
        } else {
            switch (error.response.status) {
                case 401:
                    break;
            }
        }
    } else {
        if (isTimeoutError(error)) {
            toast('');
        } else {
            toast('');
        }
    }
};

/**
 * 请求参数配置
 */
export interface AxiosOptions {
    login?: string;
    toast?: Function;
    excludes?: [];
}

/**
 * 初始化
 */
export const setupHttp = (options: AxiosOptions = {}) => {
    log(`Axios initialize.`);

    // Authorization Interceptor
    http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
        log('Axios Authorization Interceptor.');
        const token = storage.getAccessToken();
        if (isEmpty(token)) {
            config.headers.delete('Authorization');
        } else {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    });

    // Response Interceptor
    http.interceptors.response.use(
        async (response: AxiosResponse) => {
            return Promise.resolve(response.data);
        },
        async (error: AxiosError) => {
            if (error && error.response) {
                const response = error.response as AxiosResponse;
                switch (response.status) {
                    case 401:
                        log('Axios handleError 401.');
                        log(error);
                        if (isRefreshTokenRequest(response.config)) {
                            await gotoLogin(options).then();
                            return Promise.reject(error);
                        } else if (isRefreshing) {
                            const config = response.config;
                            return new Promise((resolve) => {
                                requests.push(() => {
                                    resolve(http(config));
                                });
                            });
                        } else {
                            isRefreshing = true;
                            log('Axios refresh token...');
                            return refreshApi()
                                .then(async (result) => {
                                    await handleRefreshToken(result);
                                    // 重启已暂停请求
                                    requests.forEach((request) => request());
                                    // 重新发送请求
                                    const config = response.config;
                                    return http(config);
                                })
                                .catch(async () => {
                                    log('Axios refresh token error.');
                                    await handleError(error, options);
                                })
                                .finally(() => {
                                    isRefreshing = false;
                                });
                        }
                    default:
                        await handleError(error, options);
                        break;
                }
            } else {
                await handleError(error, options);
            }
            return Promise.reject(error);
        },
    );
};

const cancelConfig: AxiosRequestConfig = {
    data: undefined,
    headers: undefined,
    cancelToken: new CancelToken((cancel) => {
        cancels.push(cancel);
    }),
};

/**
 * Get
 */
export const getConfig: AxiosRequestConfig = {
    ...cancelConfig,
};

export const get = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = getConfig): Promise<R> => {
    config.params = data;
    return http.get(url, config);
};

/**
 * Post
 */
export const postConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: (data: any, headers: any) => {
        console.log('transformRequest...');
        console.log(headers);
        console.log(stringify(data));
        return stringify(data);
    },
    ...cancelConfig,
};

export const post = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post Json
 */
export const postJsonConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: (data: any) => {
        return JSON.stringify(data);
    },
    ...cancelConfig,
};

export const postJson = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postJsonConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post FormBody
 */
export const postFormConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...cancelConfig,
};

export const postForm = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postFormConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post Multipart
 */
export const postMultipartConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    ...cancelConfig,
};

export const postMultipart = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postMultipartConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

export { cancelAllRequest, cancels, CancelToken };
export default http;
