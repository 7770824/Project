import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cartApi = createApi({
    reducerPath: 'cartApi',  //名字
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/cart/"
    }),
    tagTypes: ['Cart'],  // 添加标签类型
    endpoints(build) {  //定义各种方法
        //build.query用于查询，build.mutation用于修改
        return {
            getCart: build.query({
                query: () => 'read',//用于指定请求子路径
                providesTags: ['Cart']
            }),
            addCart: build.mutation({
                query: (data) => ({
                    url: 'add',
                    method: 'POST',
                    body: data
                }),
                invalidatesTags: ['Cart']
            }),
            changeCart: build.mutation({
                query: (data) => ({
                    url: 'numsChange',
                    method: 'POST',
                    body: data
                }),
                invalidatesTags: ['Cart']  // 使缓存失效
            }),
        };
    }
});
export const {
    useGetCartQuery,
    useAddCartMutation,
    useChangeCartMutation
} = cartApi;
export default cartApi;