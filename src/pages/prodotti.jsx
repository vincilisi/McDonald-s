import React from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionCards from "../components/card";
import prodotti from "../../mokaData/prodotti.json";
import categorySelection from "../utils/categori-selection";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const categories = [
    {
        name: "burgers",
        label: "Burgers",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/LeftRail_BurgersPCP_160x160:category-panel-left-desktop"
    },
    {
        name: "beverage",
        label: "Beverage",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/NavImage_Beverages_160x160:category-panel-left-desktop"
    },
    {
        name: "dessert",
        label: "Dessert",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/desserts_shakes_300x300:category-panel-left-desktop"
    }
];


const Prodotti = () => {

    const { name } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    const [cards, setCards] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    useEffect(() => {
        const categoria = categorySelection(name);
        let risultati;
        if (!categoria) {
            risultati = prodotti.filter(card => card.name.toLowerCase().includes(name));
        } else {
            risultati = prodotti.filter(card =>
                categoria?.includes(card.category) &&
                card.name &&
                card.name.toLowerCase().includes(query)
            );
        }

        setCards(risultati);
    }, [name, query]);

    return (
        <div className="min-h-screen bg-mcdBlack text-white relative p-6">
            <button
                className="text-3xl mb-4 text-mcdYellow cursor-pointer md:hidden"
                onClick={toggleSidebar}
            >
                ☰
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <aside className={`md:w-64 w-full bg-[#222] p-4 rounded-md transition-all duration-300 ${isSidebarOpen ? "block" : "hidden md:block"}`}>
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={`/app/prodotti/${cat.name}`}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-4 mb-4 p-2 rounded hover:bg-mcdRed transition ${name === cat.name ? "bg-mcdRed" : "bg-[#333]"
                                }`}
                        >
                            <img src={cat.img} alt={cat.label} className="w-12 h-12 object-cover rounded" />
                            <span className="text-lg font-medium">{cat.label}</span>
                        </Link>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <h1 className="text-3xl font-bold mb-6">
                        {name ? name.charAt(0).toUpperCase() + name.slice(1) : "Prodotti"}
                    </h1>
                    <SectionCards cards={cards} />
                </main>
            </div>
        </div>
    );
};

export default Prodotti;
