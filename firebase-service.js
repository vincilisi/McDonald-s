import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "./firebase-config";

const db = getFirestore(app);

export async function saveUserProfileToFirestore(uid, profileData) {
    console.log("[Firestore] saveUserProfileToFirestore chiamata con uid:", uid);

    if (!uid || typeof uid !== 'string' || uid.trim() === "") {
        const errMsg = "[Firestore] UID non valido!";
        console.error(errMsg);
        throw new Error(errMsg);
    }

    if (typeof profileData !== 'object' || profileData === null) {
        const errMsg = "[Firestore] profileData non valido!";
        console.error(errMsg);
        throw new Error(errMsg);
    }

    const userRef = doc(db, "users", uid);

    try {
        console.log("[Firestore] Inizio setDoc con dati:", profileData);
        await setDoc(userRef, profileData, { merge: true });
        console.log("[Firestore] setDoc completato con successo");
    } catch (error) {
        console.error("[Firestore] Errore salvataggio profilo:", error);
        throw error;
    }
}

export async function fetchUserProfileFromFirestore(uid) {
    console.log("[Firestore] fetchUserProfileFromFirestore chiamata con uid:", uid);

    if (!uid || typeof uid !== 'string' || uid.trim() === "") {
        const errMsg = "[Firestore] UID non valido!";
        console.error(errMsg);
        throw new Error(errMsg);
    }

    const userRef = doc(db, "users", uid);

    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("[Firestore] Documento utente trovato:", data);

            // Ritorna una copia "pulita" del dato, se vuoi
            return { ...data };
        } else {
            console.log("[Firestore] Documento utente non trovato per uid:", uid);
            return null;
        }
    } catch (error) {
        console.error("[Firestore] Errore caricamento profilo:", error);
        throw error;
    }
}
