import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import React, { useEffect, useState } from 'react';
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Layout = () => {
    return (
        <div className="app">
            <Navbar />
            <Outlet />
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
])

const App = () => {
    // const [data, setdata] = useState(null)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/api/data');
    //             const result = await response.json();
    //             setdata(result);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);
    return (

        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;