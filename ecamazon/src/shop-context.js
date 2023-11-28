import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];

      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity - 1,
        };
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }

      setCartItems(updatedCart);
    }
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalCartAmount }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext; // Export ShopContext as default
