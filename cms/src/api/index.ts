import { get } from '@/utils/http';
import { ApiResponse } from '@/types';

export class InitializeApiResult {
    //
}

export const initializeApi = (): Promise<ApiResponse<InitializeApiResult>> => {
    return get<ApiResponse<InitializeApiResult>>('/api/config');
};
