import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authApi";

export const accountsApi = createApi ({
    reducerPath: 'accounts',
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
    tagTypes: ['AccountsList'],
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => '/api/accounts/',
            providesTags: ['AccountsList'],
        }),
    }),
});

export const {
    useGetAccountsQuery,
} = accountsApi;
