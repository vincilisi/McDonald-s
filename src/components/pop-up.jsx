import McImg from "../assets/media/mc.png";
import React from "react";
const Popup = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <img src={McImg} alt="logo" className="w-20 mx-auto mb-4" />

                <p className="text-lg mb-6">
                    Do you want to empty your cart permanently?
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-mcdYellow text-black font-semibold hover:bg-mcdRed hover:text-white transition"
                    >
                        Sì, svuota
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-400 text-white font-semibold hover:bg-red-600 transition"
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
