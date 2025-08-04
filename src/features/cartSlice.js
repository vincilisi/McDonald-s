// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, size } = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === id && item.size === size
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push({ ...action.payload });
            }
        },

        updateQuantity: (state, action) => {
            const { id, size, quantity } = action.payload;
            const item = state.cartItems.find(
                (item) => item.id === id && item.size === size
            );

            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },

        updateVariant: (state, action) => {
            const { id, oldSize, newSize } = action.payload;
            const item = state.cartItems.find(
                (item) => item.id === id && item.size === oldSize
            );

            if (item) {
                item.size = newSize;
            }
        },

        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => !(item.id === id && item.size === size)
            );
        },

        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const {
    addToCart,
    updateQuantity,
    updateVariant,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
