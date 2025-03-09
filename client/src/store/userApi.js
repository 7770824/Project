import { createApi } from "@reduxjs/toolkit/query/react";
import { createQueuedFetchBaseQuery } from '../utils/queuedFetchBase';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: createQueuedFetchBaseQuery({
        baseUrl: "http://localhost:5000/api/user/",
        credentials: 'include'
    }, 2), // 最多2个并发请求
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
            updateUser: build.mutation({
                query: (formData) => ({
                    url: 'update',
                    method: 'POST',
                    body: formData,
                    formData: true,
                }),
                invalidatesTags: ['User']
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
    useUpdateUserMutation,
    useLogoutUserMutation,
    useDeleteUserMutation
} = userApi;
export default userApi;