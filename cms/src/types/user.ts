/**
 * 登录凭证
 */
export interface Credentials {
    /**
     * 用户名
     */
    username?: string;
    /**
     * 密码
     */
    password?: string;
}

/**
 * 用户信息
 */
export class User {
    /**
     * ID
     */
    id: number;
    /**
     * 用户名
     */
    username: string;
    /**
     * 昵称
     */
    displayName: string;
    /**
     * 角色
     */
    roles: string[];
    /**
     * 权限
     */
    authorities: string[];
}
