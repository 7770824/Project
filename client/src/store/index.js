import { configureStore } from "@reduxjs/toolkit";
import cartApi from "./cartApi";
import dataApi from "./dataApi";
import userApi from "./userApi";
const store = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [dataApi.reducerPath]: dataApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(cartApi.middleware)
            .concat(dataApi.middleware)
            .concat(userApi.middleware)
})
export default store;