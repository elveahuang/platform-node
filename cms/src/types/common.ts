export class ApiResponse<T = any> {
    code!: number;
    message!: string;
    data!: T;
}

export class InitializeApiResult {}
