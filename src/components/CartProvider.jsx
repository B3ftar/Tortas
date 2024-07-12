import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto del carrito
const CartContext = createContext();

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};

// Componente proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar un elemento al carrito o incrementar su cantidad si ya está presente
  const addItemToCart = (item) => {
    setCartItems(prevCartItems => {
      const itemIndex = prevCartItems.findIndex(cartItem => cartItem.id === item.id);

      if (itemIndex >= 0) {
        // Si el elemento ya está en el carrito, incrementa su cantidad
        const newCartItems = [...prevCartItems];
        newCartItems[itemIndex].quantity += 1;
        return newCartItems;
      } else {
        // Si el elemento no está en el carrito, agrégalo con cantidad inicial 1
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Función para remover un elemento del carrito por su id
  const removeItemFromCart = (itemId) => {
    setCartItems(prevCartItems => prevCartItems.filter((item) => item.id !== itemId));
  };

  // Función para limpiar completamente el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
