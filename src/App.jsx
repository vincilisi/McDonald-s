import React from "react";
import "./App.css";
import "./index.css"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Allergeni from "./pages/allergeni.jsx";
import Prodotti from "./pages/prodotti.jsx";
import HomePages from "./pages/home.jsx"
import IntroPage from "./pages/intro.jsx";
import Login from "./pages/login.jsx";
import PrivateRoute from "./components/PrivateRote.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Mappe from "./pages/mappe.jsx";
import Account from "./pages/account.jsx"
import AuthListener from "./features/users/AuthListener.jsx";
import Acquisto from "./pages/acquisto.jsx";

const routes = createBrowserRouter([
  { path: "/", element: <IntroPage /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Navigate to="/app/home" replace /> },

  {
    path: "/app",
    element: <PrivateRoute />, // blocca se non loggato
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "home", element: <HomePages /> },
          { path: "allergeni", element: <Allergeni /> },
          {
            path: "prodotti",
            children: [
              { index: true, element: <Navigate to="burgers" replace /> },
              { path: ":name", element: <Prodotti /> },
            ],
          },
          { path: "mappe", element: <Mappe /> },
          { path: "account", element: <Account /> },
          { path: "acquisto", element: <Acquisto /> }
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <AuthListener />
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
