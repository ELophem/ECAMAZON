import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useShopContext } from './shop-context';
import './Product.css';
import './Cart.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getTotalCartAmount } = useShopContext();

  const handleAdd = (product) => {
    addToCart(product);
  };

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const handleDecrease = (product) => {
    removeFromCart(product);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        <h2>Your Cart Items</h2>
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              <img src={product.image_url} alt={product.name} />
              <div className="description">
                <p>
                  <b>{product.name}</b>
                </p>
                <p>Price: ${product.price}</p>
                <div className="quantityControl">
                  <button onClick={() => handleDecrease(product)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleAdd(product)}>+</button>
                </div>
              </div>
              <button onClick={() => handleRemove(product)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Total: {getTotalCartAmount()}</p>
      </div>
      <div>
        <button>
          <Link to="/">Continue Shopping</Link>
        </button>
        <button><Link to="/checkout">Checkout</Link></button>
      </div>
    </div>
  );
};

export default Cart;
