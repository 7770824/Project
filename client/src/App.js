import React, { Suspense, useEffect, useState } from 'react';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// 使用 React.lazy 懒加载页面组件
const Home = React.lazy(() => import("./pages/Home/Home"));
const Products = React.lazy(() => import("./pages/Products/Products"));
const Product = React.lazy(() => import("./pages/Product/Product"));
const Login = React.lazy(() => import("./pages/Login/Login"));

// 加载状态组件
const LoadingSpinner = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <div>加载中...</div>
    </div>
);

const Layout = () => {
    return (
        <div className="app">
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
            </Suspense>
            <Footer />
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/product",
                element: <Product />
            }
        ]
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Login />
            </Suspense>
        )
    }
])

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;