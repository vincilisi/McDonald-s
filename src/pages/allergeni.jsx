import { useReducer } from "react";
import Navbar from "../components/navbar";
import Allergene from "../../mockData/allergeni.json";

const reducer = (state, action) => {
    switch (action.category) {
        case "Frutta a guscio":
            return "Frutta a guscio";
        case "Crostacei":
            return "Crostacei";
        case "Latte":
            return "Latte";
        case "reset":
            return "";
        default:
            return state;
    }
};

const Allergeni = () => {
    const [categoriaSelezionata, dispatch] = useReducer(reducer, "");
    const allergeniFiltrati = Allergene.filter(
        (item) => item.category === categoriaSelezionata
    );

    return (
        <>
            <Navbar />

            <div className="bg-mcdBlack text-white min-h-screen px-6 py-10">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-mcdYellow mb-4">
                        Allergene selezionato:{" "}
                        {categoriaSelezionata || "nessuno"}
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => dispatch({ category: "Frutta a guscio" })}
                            className="px-4 py-2 bg-mcdYellow text-black rounded hover:bg-mcdRed hover:text-white transition"
                        >
                            Frutta a Guscio
                        </button>
                        <button
                            onClick={() => dispatch({ category: "Crostacei" })}
                            className="px-4 py-2 bg-mcdYellow text-black rounded hover:bg-mcdRed hover:text-white transition"
                        >
                            Crostacei
                        </button>
                        <button
                            onClick={() => dispatch({ category: "Latte" })}
                            className="px-4 py-2 bg-mcdYellow text-black rounded hover:bg-mcdRed hover:text-white transition"
                        >
                            Latte
                        </button>
                        <button
                            onClick={() => dispatch({ category: "reset" })}
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-red-800 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {categoriaSelezionata && (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">
                            Allergeni nella categoria: {categoriaSelezionata}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                            {allergeniFiltrati.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#222] text-white px-6 py-4 rounded shadow-md w-full max-w-xs"
                                >
                                    <p className="text-lg font-medium">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Allergeni;
