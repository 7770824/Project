import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/user/"
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
            })
        }
    }
})
export const {
    useReginUserMutation,
    useRegistUserMutation
} = userApi;
export default userApi;