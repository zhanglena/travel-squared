import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './authApi';
import { adminApi } from './adminApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(adminApi.middleware),
});

setupListeners(store.dispatch);
