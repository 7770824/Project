import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/user/",
        credentials: 'include'
    }),
    tagTypes: ['User', 'Cart'],
    endpoints(build) {
        return {
            reginUser: build.mutation({
                query: (data) => ({
                    url: 'regin',
                    method: 'POST',
                    body: data
                }),
                invalidatesTags: ['User', 'Cart']
            }),
            registUser: build.mutation({
                query: (formData) => ({
                    url: 'regist',
                    method: 'POST',
                    // 不设置Content-Type，让浏览器自动设置为multipart/form-data
                    body: formData,
                    // 不序列化FormData
                    formData: true,
                }),
            }),
            getUserInfo: build.query({
                query: () => 'info',
                providesTags: ['User']
            }),
            logoutUser: build.mutation({
                query: () => ({
                    url: 'logout',
                    method: 'POST'
                }),
                invalidatesTags: ['User']
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
    useLogoutUserMutation,
    useDeleteUserMutation
} = userApi;
export default userApi;