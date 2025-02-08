import { configureStore } from "@reduxjs/toolkit";
import cartApi from "./cartApi";
import dataApi from "./dataApi";
const store = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [dataApi.reducerPath]: dataApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(cartApi.middleware)
            .concat(dataApi.middleware)
})
export default store;