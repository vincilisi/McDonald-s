import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config"; // usa alias se disponibile
import { login, logout } from "@/features/users/userSlice"; // aggiornato con i nomi corretti

const AuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                dispatch(login({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    name: firebaseUser.displayName || firebaseUser.email || "",
                    avatar: firebaseUser.photoURL || "",
                    isProfileComplete: false, // puoi calcolarlo meglio in futuro
                    address: "",
                    phone: "",
                    diet: "",
                    notes: "",
                }));
            } else {
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return null;
};

export default AuthListener;
