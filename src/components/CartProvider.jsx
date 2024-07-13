import React, { createContext, useState, useContext } from 'react';


const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addItemToCart = (item) => {
    setCartItems(prevCartItems => {
      const itemIndex = prevCartItems.findIndex(cartItem => cartItem.id === item.id);

      if (itemIndex >= 0) {
  
        const newCartItems = [...prevCartItems];
        newCartItems[itemIndex].quantity += 1;
        return newCartItems;
      } else {
    
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems(prevCartItems => prevCartItems.filter((item) => item.id !== itemId));
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
