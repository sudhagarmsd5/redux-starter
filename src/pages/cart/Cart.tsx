/* Hooks */
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";

/* Redux */
import {
    clearItems,
    decrementItem,
    incrementItem,
    removeItem,
    selectCartList
} from "../../redux/features/cart/cartSlice.ts";

/* Router */
import {useNavigate} from "react-router-dom";

/* Interface */
import {IProductItems} from "../../redux/features/product/interface.ts";

const Cart = () => {

    /* Variables */
    const dispatch = useAppDispatch();
    const cartList = useAppSelector(selectCartList);
    const cart = cartList.cartItems;
    const navigate = useNavigate();

    /* Methods */
    function calculateSubTotal() {
        let value: any = cart.reduce((total, product: IProductItems) => {
            return total + (parseFloat(product.price) * product.quantity);
        }, 0)
        value = parseFloat(value).toFixed(2)
        return value;
    }

    function increment(e: IProductItems) {
        dispatch(incrementItem(e))
    }

    function decrement(e: IProductItems) {
        dispatch(decrementItem(e))
    }

    function clear() {
        dispatch(clearItems())
    }

    function remove(val: IProductItems) {
        dispatch(removeItem(val))
    }

    function subTotal() {
        return (<div className="flex justify-end items-center mt-8">
            <span className="text-gray-600 mr-4">Subtotal:</span>
            <span className="text-xl font-bold">${calculateSubTotal()}</span>
        </div>);
    }

    /* React Elements */

    function cartItem(val: IProductItems) {
        return (<div key={val.id} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
            <div className="flex-shrink-0">
                <img src={val.img} alt="Product image"
                     className="w-32 h-32 object-cover"/>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
                <h2 className="text-lg font-bold">{val.title}</h2>
                <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
                    <div className="flex items-center">
                        <button className="bg-gray-200 rounded-l-lg px-2 py-1" onClick={() => decrement(val)}>-
                        </button>
                        <span className="mx-2 text-gray-600">{val.quantity}</span>
                        <button className="bg-gray-200 rounded-r-lg px-2 py-1" onClick={() => increment(val)}>+
                        </button>
                    </div>
                    <span className="ml-auto font-bold">${val.price}</span>
                </div>
            </div>
            <div className={'flex items-end'}>
                <button className={'border p-2 bg-gray-300 rounded-lg'} onClick={() => remove(val)}>Remove
                </button>
            </div>
        </div>)
    }

    function clearCart() {
        return (<div className={'flex justify-between'}>
                <button className={'border p-2 bg-gray-300 rounded-lg'} onClick={() => navigate("/")}>Back
                </button>
                <button className={'border p-2 bg-gray-300 rounded-lg'} onClick={() => clear()}>Clear Cart Items
                </button>
            </div>
        )
    }

    return (<>

        {/* cart header - back btn, clear cart btn and your cart is empty text*/}

        {cart.length !== 0 ? clearCart() : <div className={'text-center font-bold'}>
            <h4>Your Cart is Empty</h4>
        </div>}

        {/* cart list*/}

        <div className="mt-8">
            {cart.map((val) => cartItem(val))}
        </div>

        {/* subTotal of cart items */}
        {cart.length !== 0 ? subTotal() : null}
    </>)
}

export default Cart