import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase-config";

import { useDispatch } from "react-redux";
import { login, logout } from "../features/users/userSlice";

import { fetchUserProfileFromFirestore } from "../../firebase-service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);

            if (firebaseUser) {
                try {
                    // Leggi profilo completo da Firestore
                    const profile = await fetchUserProfileFromFirestore(firebaseUser.uid);

                    dispatch(
                        login({
                            email: firebaseUser.email,
                            uid: firebaseUser.uid,
                            name: profile?.name || "",
                            avatar: profile?.avatar || "",
                            isProfileComplete: profile?.isProfileComplete || false,
                        })
                    );
                } catch (error) {
                    console.error("Errore caricamento profilo:", error);
                    // fallback con dati base
                    dispatch(
                        login({
                            email: firebaseUser.email,
                            uid: firebaseUser.uid,
                            name: "",
                            avatar: "",
                            isProfileComplete: false,
                        })
                    );
                }
            } else {
                dispatch(logout());
            }
        });

        return unsubscribe;
    }, [auth, dispatch]);

    return (
        <AuthContext.Provider value={{ user, loading, auth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
