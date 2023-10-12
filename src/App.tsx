import './App.css'
import Products from "./pages/products/Products.tsx"
import Cart from "./pages/cart/Cart.tsx";
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import Layout from "./components/shared/Layout.tsx";

function App() {

    const router = createBrowserRouter([{
        path: "/",
        Component: Layout,
        children: [
            {
                path: "/",
                Component: Products
            },
            {
                path: "cart",
                Component: Cart
            }
        ]
    }]);
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
