import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (itemToAdd) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === itemToAdd.id);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += itemToAdd.quantity;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, itemToAdd]);
        }
    };

    const removeItemFromCart = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
