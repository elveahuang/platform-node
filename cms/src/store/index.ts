import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
//
import appReducer from '@/store/app';
import userReducer from '@/store/user';
import { log } from '@/utils';

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
});

export const createStore = () => {
    log(`Redux initialize.`);
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
    });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export type RootStore = typeof store;

export { appReducer, userReducer };

export default store;

export const useRootDispatch: () => RootDispatch = useDispatch;

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector = () => useRootSelector((state) => state.app);

export const useUserSelector = () => useRootSelector((state) => state.user);
