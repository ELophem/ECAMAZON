// Cart.js

import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useShopContext } from './shop-context';

import './Product.css';
const Cart = () => {
  const { cartItems,addToCart,removeFromCart, getTotalCartAmount } = useShopContext();

  return (
    <div>
      <h1>Your Cart</h1>
      {/* Cart items display goes here */}
      <div>
        <h1>Your Cart Items</h1>
        <ul>
        {cartItems.map((product) => (
          <li key={product.id}>
                  <img src={product.image_url} />
              <div className="description">
        <p>
          <b>{product.name}</b>
        </p>
        <p> Price: ${product.price}</p>
        <button onClick={() => addToCart(product)}> + </button>
      </div>
          </li>
        ))}
      </ul>
      </div>
      {cartItems.map((product) => (
      <div><button onClick={() => removeFromCart(product)}> Supprimer le panier </button></div>))}
      <div>
        <p>{getTotalCartAmount}</p>
      </div>
      <div>
        <button> <Link to="/"> Continuer son shopping</Link></button>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;