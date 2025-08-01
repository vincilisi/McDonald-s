import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        // Puoi sostituire con uno spinner o altro
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Se l'utente è loggato, rendi le rotte figlie
    return <Outlet />;
};

export default PrivateRoute;
