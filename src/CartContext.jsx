import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };


  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };


  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
