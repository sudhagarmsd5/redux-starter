/*Images */
import cart from "../../../assets/cart.svg";

/* Hooks */
import {useAppSelector} from "../../../redux/hooks/hooks.ts";

/* Redux */
import {selectCartList} from "../../../redux/features/cart/cartSlice.ts";

/* Router */
import {useNavigate} from 'react-router-dom';

const Header = () => {
    /* variables */
    const navigate = useNavigate();
    const cartList = useAppSelector(selectCartList);

    /* methods */
    function cartPage() {
        navigate("/cart")
    }

    function homePage() {
        navigate("/")
    }

    return (
        <section className={'h-20 w-full bg-blue-600 fixed top-0 z-10'}>
            <div className={'flex justify-center items-center h-20'}>
                <h2 className={'text-lg text-white cursor-pointer'} onClick={() => homePage()}>Mobi Zone</h2>
            </div>
            <div className={'h-10 w-10 absolute top-4 right-8'}>
                <div className={'flex'}>
                    <img src={cart} className={'cursor-pointer'} onClick={() => cartPage()}/>
                    <span className={'flex justify-center items-center text-white'}>
                    {JSON.stringify(cartList.cartItems.length)}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default Header