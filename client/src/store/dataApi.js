import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/data"
    }),
    tagTypes: ['Data'],
    endpoints(build) {
        return {
            getData: build.query({
                query: () => '/',
                providesTags: ['Data']
            }),
            getDataById: build.query({
                query: (id) => `/product/${id}`,
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