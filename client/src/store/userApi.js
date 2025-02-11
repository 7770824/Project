import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/user/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints(build) {
        return {
            reginUser: build.mutation({
                query: (data) => ({
                    url: 'regin',
                    method: 'POST',
                    body: data
                }),
                providesTags: ['User']
            }),
            registUser: build.mutation({
                query: (data) => ({
                    url: 'regist',
                    method: 'POST',
                    body: data
                }),
            }),
            getUserInfo: build.query({
                query: () => 'info',
                providesTags: ['User']
            }),
            deleteUser: build.mutation({
                query: () => ({
                    url: 'delete',
                    method: 'DELETE'
                })
            })
        }
    }
})
export const {
    useReginUserMutation,
    useRegistUserMutation,
    useGetUserInfoQuery,
    useDeleteUserMutation
} = userApi;
export default userApi;