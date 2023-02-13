import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVELSQUARED,
        prepareHeaders: (headers, { getState }) => {
            const selector = authApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Account', 'Token'],
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.username);
                    formData.append('password', info.password);
                }
                return {
                    url: '/token',
                    method: 'post',
                    body: formData,
                    credentials: 'include',
                };
            },
            providesTags: ['Account'],
            invalidatesTags: (result) => {
                return (result && ['Token']) || [];
            },
        }),
        signUp: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.username);
                    formData.append('full_name', info.full_name);
                    formData.append('email', info.email);
                    formData.append('password', info.password);
                }
                return {
                    url: '/api/accounts/',
                    method: 'post',
                    body: info,
                    credentials: 'include'
                }
            },
            providesTags: ['Account'],
            invalidatesTags: (result) => {
                return (result && ['Account']) || [];
            },
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'delete',
                credentials: 'include',
            }),
            invalidatesTags: ['Account', 'Token'],
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            providesTags: ['Token'],
        }),
    }),
});

export const {
    useLogInMutation,
    useSignUpMutation,
    useLogOutMutation,
    useGetTokenQuery
} = authApi;
