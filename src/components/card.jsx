import React from "react";
import Tile from "./tile";

const SectionCards = ({ cards = [], addToCart }) => {
    if (!cards.length)
        return (
            <p className="text-white text-center mt-10 text-lg">
                Nessun prodotto trovato.
            </p>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8">
            {cards.map((card) => (
                <Tile
                    key={card.id}
                    id={card.id}
                    img={card.image}
                    title={card.name}
                    price={card.price}
                    variant={card.variant}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
};

export default SectionCards;
