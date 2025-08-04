import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "./layout";
import Popup from "./pop-up";

const CartLogin = () => {
    const [showCart, setShowCart] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [tempRemovedItem, setTempRemovedItem] = useState(null);
    const { cartItems, decreaseQuantity, increaseQuantity } = useContext(CartContext);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const toggleCart = () => setShowCart(prev => !prev);

    const handleDecrease = (item) => {
        if (cartItems.length === 1 && item.quantity === 1) {
            setTempRemovedItem(item);
            setIsPopupOpen(true);
        } else {
            decreaseQuantity(item);
        }
    };

    const confirmEmptyCart = () => {
        if (tempRemovedItem) {
            decreaseQuantity(tempRemovedItem);
            setTempRemovedItem(null);
        }
        setIsPopupOpen(false);
    };

    const cancelEmptyCart = () => {
        setTempRemovedItem(null);
        setIsPopupOpen(false);
    };

    return (
        <div className="relative">
            {/* Bottone carrello */}
            <button
                onClick={toggleCart}
                className="relative bg-mcdYellow text-black p-2 rounded-full hover:bg-mcdRed hover:text-white transition"
            >
                <TiShoppingCart className="text-2xl" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                        {cartItems.length}
                    </span>
                )}
            </button>

            {/* Popup carrello */}
            {showCart && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-md shadow-lg z-50 p-4">
                    {cartItems.length > 0 ? (
                        <>
                            <ul className="space-y-3">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm">
                                        <span>{item.name}{item.size ? ` - ${item.size}` : ""}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDecrease(item)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-red-400"
                                            >
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(item)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-green-400"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 text-center">
                                <Link
                                    to="/app/acquisto"
                                    className="inline-block px-4 py-2 bg-mcdYellow text-black rounded hover:bg-mcdRed hover:text-white transition text-sm font-semibold"
                                    onClick={() => setShowCart(false)}
                                >
                                    Vai al pagamento
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 text-sm">Il carrello è vuoto.</p>
                    )}
                </div>
            )}

            {/* Popup conferma rimozione */}
            {isPopupOpen && (
                <Popup onConfirm={confirmEmptyCart} onCancel={cancelEmptyCart} />
            )}
        </div>
    );
};

export default CartLogin;
