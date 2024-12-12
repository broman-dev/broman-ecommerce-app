import "./Header.scss"
import { FC, useState } from 'react'
import Navigation from "../navigation/Navigation"
import QuantityPicker from "../ui/quantityPicker/QuantityPicker";
import Logo from "../../assets/logo.png"
import { useCart } from "../../hooks/useCart";
import CartSidebar from "../cartSidebar/CartSidebar";

const Header: FC = () => {
    const { items, getTotalSum, clearCart} = useCart();
    const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

    return (
        <header className="fixed w-full z-10 flex justify-between items-center max-h-[100px] text-black py-6 px-8 md:px-32 bg-white drop-shadow-md">
            <section className="flex">
                <a href="/" className="mt-[40px]">
                    <img className="w-52 hover:scale-105 transition-all" alt="" src={Logo} />
                </a>
                <Navigation />
            </section>

            <section className="flex items-center">
                {getTotalSum!().toFixed(2)} €
                
                <button
                    onClick={() => setIsCartVisible(!isCartVisible)}
                    className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    {items.length > 0 &&
                        <span className="absolute inset-0 object-right-top -mr-6">
                            <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                                {items.length}
                            </div>
                        </span>
                    }
                </button>
                <div className={`cart-sidebar-wrapper font-semibold ${isCartVisible ? null : "hidden"}`}>
                    <CartSidebar close={() => setIsCartVisible(!isCartVisible)}/>
                </div>
            </section>
        </header>
    )
}

export default Header