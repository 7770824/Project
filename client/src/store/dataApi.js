import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api"
    }),
    tagTypes: ['Data'],
    endpoints(build) {
        return {
            getData: build.query({
                query: (params = {}) => {
                    const { 
                        page = 1, 
                        limit = 12,
                        categories,
                        symbol,
                        kinds,
                        priceRange,
                        sortBy
                    } = params;
                    
                    // 构建查询字符串
                    const queryParams = new URLSearchParams();
                    queryParams.append('page', page);
                    queryParams.append('limit', limit);
                    
                    if (categories) queryParams.append('categories', categories);
                    if (symbol) queryParams.append('symbol', symbol);
                    if (kinds) queryParams.append('kinds', kinds);
                    if (priceRange) queryParams.append('priceRange', priceRange);
                    if (sortBy) queryParams.append('sortBy', sortBy);
                    
                    return `/data?${queryParams.toString()}`;
                },
                // 缓存键策略 - 根据过滤条件分开缓存
                serializeQueryArgs: ({ queryArgs }) => {
                    // 过滤条件变化时创建新的缓存键
                    const { page, ...filters } = queryArgs || {};
                    return JSON.stringify(filters);
                },
                // 合并新加载的数据
                merge: (currentCache, newItems) => {
                    // 如果是第一页，直接返回新数据
                    if (newItems.page === 1) {
                        return newItems;
                    }
                    // 否则合并数据
                    return {
                        ...newItems,
                        items: [...(currentCache?.items || []), ...newItems.items]
                    };
                },
                // 仅当参数变化时才触发新请求
                forceRefetch({ currentArg, previousArg }) {
                    return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
                },
                providesTags: ['Data']
            }),
            getDataById: build.query({
                query: (id) => `/data/product/${id}`,
                providesTags: ['Data']
            })
        }
    }
})

export const {
    useGetDataQuery,
    useGetDataByIdQuery
} = dataApi;
export default dataApi;