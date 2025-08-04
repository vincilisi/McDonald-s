import React, { useState } from "react";
import { Link } from "react-router-dom";
import McImg from "../assets/media/mc.png";
import SearchButtonWithInput from "./search";
import CartLogin from "./cart";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user, auth } = useAuth();
    const { isAuthenticated, data } = useSelector(state => state.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Errore logout:", error);
        }
    };

    const renderUserInfo = () => {
        if (!isAuthenticated) return "Account";
        if (data.avatar) {
            return <img src={data.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />;
        } else if (data.name) {
            return <span>{data.name}</span>;
        } else {
            return <span>Account</span>;
        }
    };

    return (
        <nav className="bg-[#d90007] text-white px-8 py-3 flex items-center justify-between flex-wrap relative">
            <div className="flex-shrink-0 mr-auto">
                <Link to="/">
                    <img className="w-20 h-auto" src={McImg} alt="logo" />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center gap-6 ml-8 min-w-0">
                <Link to="/app/home" className="text-mcdYellow text-xl ml-8 hover:border-b-4 border-mcdRed">Home</Link>
                <Link to="/app/prodotti" className="text-white text-xl hover:border-b-4 border-mcdRed">Prodotti</Link>
                <Link to="/app/allergeni" className="text-white text-xl hover:border-b-4 border-mcdRed">Allergeni</Link>
                <Link to="/app/mappe" className="text-white text-xl hover:border-b-4 border-mcdRed">Dove siamo nel Mondo</Link>
                <Link to="/app/account" className="text-white text-xl hover:border-b-4 border-mcdRed">{renderUserInfo()}</Link>
            </div>

            <div className="hidden md:flex items-center gap-4 ml-4">
                <SearchButtonWithInput />
                <CartLogin />
                <div>
                    {user ? (
                        <button onClick={handleLogout} className="px-4 py-2 bg-mcdYellow text-black rounded-md text-base hover:bg-mcdRed hover:text-white transition">
                            Logout
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-mcdYellow text-black rounded-md text-base hover:bg-mcdRed hover:text-white transition">
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
                <button
                    className={`flex flex-col justify-between w-8 h-6 cursor-pointer z-50 ${isSidebarOpen ? "open" : ""}`}
                    onClick={toggleSidebar}
                    aria-label="Menu"
                    aria-expanded={isSidebarOpen}
                >
                    <span className="h-1 bg-white rounded transition-transform duration-300" style={isSidebarOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}}></span>
                    <span className={`h-1 bg-white rounded transition-opacity duration-300 ${isSidebarOpen ? "opacity-0" : ""}`}></span>
                    <span className="h-1 bg-white rounded transition-transform duration-300" style={isSidebarOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}}></span>
                </button>

                <SearchButtonWithInput />
            </div>

            {/* Sidebar Mobile */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-[#222] text-white z-40 p-6 transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col gap-4">
                    <Link to="/app/home" onClick={() => setIsSidebarOpen(false)} className="text-white text-lg hover:border-b-2 border-mcdRed">Home</Link>
                    <Link to="/app/prodotti" onClick={() => setIsSidebarOpen(false)} className="text-white text-lg hover:border-b-2 border-mcdRed">Prodotti</Link>
                    <Link to="/app/allergeni" onClick={() => setIsSidebarOpen(false)} className="text-white text-lg hover:border-b-2 border-mcdRed">Allergeni</Link>
                    <Link to="/app/mappe" onClick={() => setIsSidebarOpen(false)} className="text-white text-lg hover:border-b-2 border-mcdRed">Dove siamo nel Mondo</Link>
                    <Link to="/app/account" onClick={() => setIsSidebarOpen(false)} className="text-white text-lg hover:border-b-2 border-mcdRed">{renderUserInfo()}</Link>

                    <CartLogin />

                    <div className="mt-4">
                        {user ? (
                            <button onClick={handleLogout} className="w-full px-4 py-2 bg-mcdYellow text-black rounded-md text-base hover:bg-mcdRed hover:text-white transition">
                                Logout
                            </button>
                        ) : (
                            <button className="w-full px-4 py-2 bg-mcdYellow text-black rounded-md text-base hover:bg-mcdRed hover:text-white transition">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
