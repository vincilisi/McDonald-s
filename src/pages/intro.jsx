import React from "react";
import { FaReacteurope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        navigate("/home");
    };

    return (
        <div className="bg-mcdBlack min-h-screen flex items-center justify-center px-4">
            <div className="bg-[#222] p-8 rounded-lg text-center max-w-md shadow-lg">
                <p className="text-white text-lg mb-6">
                    This application was created by me using only React and is an example
                    of a McDonald's menu.
                </p>

                <FaReacteurope
                    onClick={handleEnter}
                    className="text-mcdYellow text-6xl cursor-pointer hover:text-mcdRed transition"
                    title="Entra nel progetto"
                />
            </div>
        </div>
    );
};

export default IntroPage;
