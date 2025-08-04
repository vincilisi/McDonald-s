import React from 'react';

import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
import '../index.css'
export const CartContext = createContext();

const Layout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState(() => {
        const items = localStorage.getItem("cartItems");
        return items ? JSON.parse(items) : [];
    });

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const index = prevItems.findIndex(
                i => i.id === item.id && i.size === item.size
            );
            if (index !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[index].quantity += 1;
                return updatedItems;
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (item) => {
        setCartItems(prevItems =>
            prevItems.map(i =>
                i.id === item.id && i.size === item.size
                    ? { ...i, quantity: (i.quantity || 1) + 1 }
                    : i
            )
        );
    };

    const decreaseQuantity = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id && i.size === item.size);
            if (!existingItem) return prevItems;

            if (existingItem.quantity === 1) {
                return prevItems.filter(i => !(i.id === item.id && i.size === item.size));
            } else {
                return prevItems.map(i =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                );
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const contextValue = {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        setSearchQuery,
    };

    return (
        <CartContext.Provider value={contextValue}>
            <Navbar />
            <main className="min-h-screen bg-mcdBlack text-white">
                <Outlet context={{ searchQuery, setSearchQuery, addToCart }} />
            </main>
            <Footer />
        </CartContext.Provider>
    );
};

export default Layout;
