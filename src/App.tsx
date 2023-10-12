import './App.css'
import Products from "./pages/products/Products.tsx"
import Cart from "./pages/cart/Cart.tsx";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/shared/Layout.tsx";

function App() {

    const router = createHashRouter([{
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
