import { isEmpty } from 'lodash-es';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { storage } from '@/utils/storage';
import { RootState } from '@/store/index.ts';

export interface UserState {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export const initialState: UserState = {
    accessToken: storage.getAccessToken() || null,
    refreshToken: storage.getRefreshToken() || null,
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAccessToken: (state: UserState, action: PayloadAction<string>) => {
            storage.setAccessToken(action.payload);
            return { ...state, accessToken: action.payload };
        },
        setRefreshToken: (state: UserState, action: PayloadAction<string>) => {
            storage.setRefreshToken(action.payload);
            return { ...state, refreshToken: action.payload };
        },
        setUser: (state: UserState, action: PayloadAction<User>) => {
            state.user = action.payload;
            return state;
        },
        clear: (state: UserState) => {
            storage.removeAccessToken();
            storage.removeRefreshToken();
            return { ...state, user: null, refreshToken: null, accessToken: null };
        },
    },
});

export const { setAccessToken, setRefreshToken, setUser, clear } = userSlice.actions;

export default userSlice.reducer;

/**
 * 当前是否匿名用户
 */
export const isAnonymous = (state: RootState) => isEmpty(state.user.accessToken);

/**
 * 当前是否已经登录
 */
export const isAuthenticated = (state: RootState) => !isEmpty(state.user.accessToken);
