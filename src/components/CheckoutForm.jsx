// components/CheckoutForm.jsx

import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        // Simulazione conferma pagamento
        setShowModal(true);
    };

    return (
        <div className="bg-white text-mcdBlack p-6 rounded-lg shadow-md">
            <p className="text-center font-semibold mb-4">💡 Usa card falsa per test</p>

            <form onSubmit={handleSubmit}>
                <div className="border border-gray-300 rounded p-4 mb-4">
                    <CardElement />
                </div>

                <button
                    type="submit"
                    className="w-full bg-mcdYellow text-black font-bold py-2 rounded hover:bg-yellow-400 transition"
                >
                    Conferma pagamento
                </button>
            </form>

            {showModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div className="bg-white p-6 rounded-lg text-center shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Ordine acquistato con successo 🥳</h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-mcdRed text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;
