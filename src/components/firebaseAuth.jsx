import { useEffect } from "react";
import { getAuth, GoogleAuthProvider, EmailAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import app from "../../firebase-config";

export default function FirebaseAuth() {
    useEffect(() => {
        const auth = getAuth(app);

        // imposta la persistenza
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const ui =
                    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

                ui.start("#firebaseui-auth-container", {
                    signInOptions: [
                        {
                            provider: GoogleAuthProvider.PROVIDER_ID,
                            // puoi aggiungere params se vuoi
                        },
                        EmailAuthProvider.PROVIDER_ID,
                    ],
                    callbacks: {
                        signInSuccessWithAuthResult: (authResult) => {
                            console.log("Login effettuato, user:", authResult.user);
                            return false;
                        },
                        uiShown: () => console.log("UI Firebase pronto"),
                    },
                });

                return () => ui.reset();
            })
            .catch((error) => {
                console.error("Errore setPersistence:", error);
            });
    }, []);

    return <div id="firebaseui-auth-container"></div>;
}
