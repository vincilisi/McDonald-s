import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { TiShoppingCart } from "react-icons/ti";

const Tile = ({ id, img, title, price, variant = [] }) => {
    const dispatch = useDispatch();
    const [selectedVariant, setSelectedVariant] = useState(variant[0] || null);

    const displayedImage = selectedVariant?.image || img || "";
    const displayedPrice = selectedVariant?.price ?? price ?? 0;
    const displayedSize = selectedVariant?.size || "";

    const handleSelectVariant = (v) => setSelectedVariant(v);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(
            addToCart({
                id,
                name: title,
                image: displayedImage,
                price: displayedPrice,
                size: displayedSize || "default",
                quantity: 1,
            })
        );
    };

    return (
        <div className="relative bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition max-w-xs mx-auto">
            <div
                className="absolute top-3 right-3 bg-mcdYellow text-black p-2 rounded-full cursor-pointer hover:bg-mcdRed hover:text-white"
                onClick={handleAddToCart}
                title="Aggiungi al carrello"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleAddToCart(e)}
            >
                <TiShoppingCart size={20} />
            </div>

            <div className="mb-3">
                <img
                    src={displayedImage}
                    alt={title}
                    className="w-40 h-40 object-cover mx-auto rounded"
                />
            </div>

            <div className="mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 text-base">
                    {displayedSize && <strong>{displayedSize}: </strong>}
                    {typeof displayedPrice === "number"
                        ? `$${displayedPrice.toFixed(2)}`
                        : "Prezzo non disponibile"}
                </p>
            </div>

            {variant.length > 0 && (
                <div className="flex justify-center gap-2 mt-3">
                    {variant.map((v, index) => (
                        <button
                            key={index}
                            type="button"
                            title={v.size}
                            onClick={() => handleSelectVariant(v)}
                            className={`w-8 h-8 rounded-full font-bold text-white transition ${selectedVariant?.size === v.size
                                ? "bg-mcdRed"
                                : "bg-gray-400 hover:bg-mcdYellow hover:text-black"
                                }`}
                        >
                            {v.size.charAt(0)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tile;
