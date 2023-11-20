import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, getTotalCartAmount }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext; // Export ShopContext as default
