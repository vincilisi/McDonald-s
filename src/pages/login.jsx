import React, { useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const { user, loading, auth } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Errore login Google:", error);
            setErrorMsg(error.message);
        }
    };

    const handleLoginEmail = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Errore login email:", error);
            setErrorMsg(error.message);
        }
    };

    if (loading)
        return <div className="text-white text-center mt-8">Caricamento...</div>;
    if (user) return <Navigate to="/app/home" replace />;

    return (
        <div className="min-h-screen bg-mcdBlack text-white flex flex-col items-center justify-center px-4 py-10">
            <div className="bg-[#222] p-6 rounded-lg max-w-md w-full shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                {errorMsg && (
                    <p className="text-red-500 text-center mb-4">{errorMsg}</p>
                )}

                <button
                    onClick={handleLoginGoogle}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition"
                >
                    <FcGoogle className="text-xl" /> Accedi con Google
                </button>

                <hr className="my-6 border-gray-500" />

                {!showEmailForm && (
                    <button
                        onClick={() => setShowEmailForm(true)}
                        className="w-full bg-mcdYellow text-black py-2 rounded font-medium hover:bg-mcdRed hover:text-white transition"
                    >
                        Accedi con Email
                    </button>
                )}

                {showEmailForm && (
                    <form onSubmit={handleLoginEmail} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 rounded border border-gray-300 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 rounded border border-gray-300 text-black"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-mcdYellow text-black py-2 rounded font-medium hover:bg-mcdRed hover:text-white transition"
                            >
                                Accedi
                            </button>
                            <button
                                type="button"
                                className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-red-700 transition"
                                onClick={() => setShowEmailForm(false)}
                            >
                                Annulla
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
