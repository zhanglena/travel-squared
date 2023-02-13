import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "./authApi";

export const adminApi = createApi ({
    reducerPath: 'admin',
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
    tagTypes: ['CategoriesList', 'UnapprovedVenuesList'],
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (info) => ({
                url: '/api/categories/',
                body: {
                    category_name: info.category_name
                },
                credentials: 'include',
                method: 'post'
            }),
            invalidatesTags: (result) => {
                return (result && ["CategoriesList"]) || [];
            },
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/api/categories/',
                credentials: 'include',
            }),
            providesTags: ['CategoriesList'],
        }),
        getUnapprovedVenues: builder.query({
            query: () => ({
                url: '/api/venues/unapproved/',
                credentials: 'include',
            }),
            providesTags: ['UnapprovedVenuesList'],
        }),
        updateVenue: builder.mutation({
            query: (info) => ({
                url: `/api/venues/${info.venue_id}`,
                body: {
                    venue_name: info.venue_name,
                    num_and_street: info.num_and_street,
                    city: info.city,
                    state: info.state,
                    zip: info.zip,
                    category_id: info.category_id,
                    description_text: info.description_text,
                    added_by: info.added_by
                },
                credentials: 'include',
                method: 'put',
            }),
            invalidatesTags: (result) => {
                return (result && ['UnapprovedVenuesList']) || [];
            },
        }),
        deleteVenue: builder.mutation({
            query: (info) => {
                return {
                    url: `/api/venues/${info.venue_id}`,
                    method: 'delete',
                    credentials: 'include',
                };
            },
            invalidatesTags: (result) => {
                return (result && ['UnapprovedVenuesList']) || [];
            },
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useGetUnapprovedVenuesQuery,
    useUpdateVenueMutation,
    useDeleteVenueMutation
} = adminApi;
