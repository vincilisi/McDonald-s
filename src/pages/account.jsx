import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../features/users/userSlice";

const Account = () => {
    const dispatch = useDispatch();
    const {
        name: savedName,
        avatar: savedAvatar,
        isProfileComplete,
        uid,
        status,
        error,
        address: savedAddress,
        phone: savedPhone,
        diet: savedDiet,
        notes: savedNotes,
    } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [diet, setDiet] = useState("");
    const [notes, setNotes] = useState("");
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(!isProfileComplete);

    useEffect(() => {
        if (!uid) return;
        if (savedName) {
            const parts = savedName.split(" ");
            setName(parts[0] || "");
            setSurname(parts.slice(1).join(" ") || "");
        }
        if (savedAvatar) setAvatar(savedAvatar);
        if (savedAddress) setAddress(savedAddress);
        if (savedPhone) setPhone(savedPhone);
        if (savedDiet) setDiet(savedDiet);
        if (savedNotes) setNotes(savedNotes);
    }, [
        uid,
        savedName,
        savedAvatar,
        savedAddress,
        savedPhone,
        savedDiet,
        savedNotes,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;
        if (!uid) return alert("UID mancante");

        setSaving(true);

        const profile = {
            name: `${name} ${surname}`.trim(),
            avatar,
            isProfileComplete: true,
            uid,
            address,
            phone,
            diet,
            notes,
        };

        try {
            await dispatch(updateProfile(profile)).unwrap();
            alert("Profilo salvato con successo!");
            setIsEditing(false);
        } catch (err) {
            alert("Errore salvataggio: " + err);
        } finally {
            setSaving(false);
        }
    };

    const avatarList = ["aletta.jpg", "fish.jpg", "patatine.jpg"];

    const AvatarSelect = () => (
        <div className="flex gap-4 justify-center mb-4">
            {avatarList.map((img, i) => (
                <img
                    key={i}
                    src={`/avatars/${img}`}
                    alt={`Avatar ${i + 1}`}
                    onClick={() => setAvatar(`/avatars/${img}`)}
                    className={`w-16 h-16 rounded-full object-cover cursor-pointer border-4 ${avatar === `/avatars/${img}`
                        ? "border-mcdYellow"
                        : "border-gray-400"
                        }`}
                />
            ))}
        </div>
    );

    if (!isEditing) {
        return (
            <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-xl shadow-md text-gray-800 font-sans">
                <h2 className="text-2xl font-bold text-center mb-4">Il tuo profilo</h2>
                <div className="space-y-2">
                    <p><strong>Nome:</strong> {name} {surname}</p>
                    <p><strong>Indirizzo:</strong> {address}</p>
                    <p><strong>Telefono:</strong> {phone || "Non fornito"}</p>
                    <p><strong>Avatar:</strong></p>
                    <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-mcdYellow mb-2" />
                    <p><strong>Preferenze alimentari:</strong> {diet || "Nessuna"}</p>
                    <p><strong>Note aggiuntive:</strong> {notes || "Nessuna"}</p>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="mt-6 w-full px-4 py-2 bg-mcdYellow text-black rounded font-bold hover:bg-mcdRed hover:text-white transition"
                >
                    Modifica dati
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-xl shadow-md font-sans">
            <h2 className="text-2xl font-bold text-center mb-4">
                Completa il tuo profilo
            </h2>

            {status === "failed" && (
                <p className="text-red-600 text-center mb-2">Errore: {error}</p>
            )}
            {saving && (
                <p className="text-gray-500 italic text-center mb-2">
                    Salvataggio in corso...
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2 text-black">
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Cognome"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="Indirizzo di consegna"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                />

                <input
                    type="tel"
                    placeholder="Telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />

                <label className="font-semibold text-gray-700 mt-4 block">
                    Scegli avatar:
                </label>
                <AvatarSelect />

                <label className="font-semibold text-gray-700 mt-2 block text-black">
                    Preferenze alimentari:
                </label>
                <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                >
                    <option className="text-black" value="">Nessuna</option>
                    <option className="text-black" value="vegetariano">Vegetariano</option>
                    <option className="text-black" value="vegano">Vegano</option>
                    <option className="text-black" value="senza-glutine">Senza glutine</option>
                    <option className="text-black" value="altro">Altro</option>
                </select>

                <textarea
                    placeholder="Note aggiuntive (es. allergie, preferenze...)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded min-h-[80px] text-black"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full px-4 py-2 bg-mcdYellow text-black font-bold rounded hover:bg-mcdRed hover:text-red-500 transition"
                >
                    {saving ? "Salvataggio in corso..." : "Salva Profilo"}
                </button>
            </form>
        </div>
    );
};

export default Account;
