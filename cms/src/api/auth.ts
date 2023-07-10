import { ApiResponse, User } from '@/types';
import { get, post } from '@/utils/http';
import storage from '@/utils/storage';

/**
 * 刷新凭证
 */
export interface RefreshApiResult {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface RefreshApiParams {
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
    refresh_token?: string;
}

export const refreshApi = (): Promise<RefreshApiResult> => {
    const params: RefreshApiParams = {
        refresh_token: storage.getRefreshToken(),
    };
    return post<RefreshApiResult>('/oauth/token', params);
};

/**
 * 用户登录
 */
export interface LoginApiResult {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface LoginApiParams {
    identifier?: string;
    password?: string;
}

export const loginApi = (params: LoginApiParams) => {
    return post<LoginApiResult>('/api/auth/local', params);
};

/**
 * 用户退出登录
 */
export type LogoutApiResult = {};

export const logoutApi = (): Promise<ApiResponse<LogoutApiResult>> => {
    return post<ApiResponse<LogoutApiResult>>('/api/logout');
};

/**
 * 获取用户信息
 */
export class UserInfoApiResult {
    user: User;
    now: Date | string;
}

export const userInfoApi = (): Promise<ApiResponse<UserInfoApiResult>> => {
    return get<ApiResponse<UserInfoApiResult>>('/api/users/me');
};

/**
 * 用户注册
 */
export class RegisterApiResult {
    user: User;
    now: Date | string;
}

export class RegisterApiParams {
    username?: string;
    password?: string;
}

export const registerApi = (params: RegisterApiParams) => {
    return post<ApiResponse<RegisterApiResult>>('/api/register', params);
};
