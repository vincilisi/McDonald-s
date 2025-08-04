import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../features/cartSlice";
import Popup from "../components/pop-up";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { STRIPE_PUBLIC_KEY } from "../../stripe-config";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Acquisto = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart?.cartItems ?? []);

    const [popupVisible, setPopupVisible] = useState(false);
    const [pendingRemove, setPendingRemove] = useState(null);

    const confirmRemoval = () => {
        if (pendingRemove) {
            dispatch(removeFromCart({ id: pendingRemove.id, size: pendingRemove.size }));
        }
        setPopupVisible(false);
        setPendingRemove(null);
    };

    const cancelRemoval = () => {
        setPopupVisible(false);
        setPendingRemove(null);
    };

    const handleDecrease = (item) => {
        if (item.quantity === 1) {
            setPendingRemove(item);
            setPopupVisible(true);
        } else {
            dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity - 1 }));
        }
    };

    const handleIncrease = (item) => {
        dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity + 1 }));
    };

    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div className="min-h-screen bg-mcdBlack text-white py-10 px-6 font-sans">
            <h1 className="text-3xl font-bold text-center text-mcdYellow mb-8">
                Riepilogo Acquisto
            </h1>

            {cartItems.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {cartItems.map((item, index) => (
                            <div key={index} className="bg-white text-mcdBlack rounded-xl shadow-lg p-4 flex flex-col items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded-full border-4 border-mcdRed mb-4"
                                />
                                <h2 className="text-xl font-bold text-center mb-1">{item.name}</h2>
                                {item.size && (
                                    <p className="text-sm text-mcdRed mb-1 font-medium">
                                        Variante: {item.size}
                                    </p>
                                )}
                                <p className="text-sm mb-2">
                                    Prezzo unitario: <strong>{item.price.toFixed(2)}€</strong>
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleDecrease(item)}
                                        className="px-2 py-1 bg-mcdRed text-white rounded hover:bg-red-600"
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrease(item)}
                                        className="px-2 py-1 bg-mcdYellow text-black rounded hover:bg-yellow-500"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-xl font-bold text-mcdYellow">
                            Totale ordine: {total.toFixed(2)}€
                        </p>
                    </div>

                    <div className="mt-10 max-w-xl mx-auto">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </>
            ) : (
                <div className="text-center col-span-2 flex flex-col items-center">
                    <p className="italic text-gray-400 mb-4">Il carrello è vuoto.</p>
                    <button
                        onClick={() => navigate("/app/prodotti")}
                        className="bg-mcdYellow text-mcdBlack font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition"
                    >
                        Torna al Menù
                    </button>
                </div>
            )}

            {popupVisible && (
                <Popup onConfirm={confirmRemoval} onCancel={cancelRemoval} />
            )}
        </div>
    );
};

export default Acquisto;
