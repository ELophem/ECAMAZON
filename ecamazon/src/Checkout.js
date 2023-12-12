import React, { useState } from 'react';
import { useShopContext } from './shop-context';
import { useNavigate } from 'react-router-dom';
import './LoadingSpinner.css'; // Import your CSS file for styling

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount, clearCart } = useShopContext();
  const [clientName, setClientName] = useState('');

  const handleOrderPlacement = () => {
    // You can perform the payment API call here and then proceed to store the order
    // Replace this setTimeout with your actual API call for payment
    setTimeout(() => {
      // Simulating a successful payment
      const formattedCartItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: `${item.quantity}`,
        price: item.price
      }));
  
      const orderData = {
        orderId: generateOrderId(), // Replace with your method to generate an order ID
        articles: formattedCartItems, // Updated articles field with necessary information
        amount: getTotalCartAmount(),
        clientName: clientName
      };
  
      // Replace this with your actual API call to store the order
      fetch('http://localhost:4000/api/orders/storeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
        .then(response => {
          // Handle response if needed
          console.log('Order placed successfully!');
          clearCart(); // Clear the cart after successful order placement
          navigate('/'); // Redirect to the shop page after successful order placement
        })
        .catch(error => {
          console.error('Error placing order:', error);
        });
    }, 1000); // Simulating a 1-second delay before placing the order
  };
  

  const generateOrderId = () => {
    // Replace this with your method to generate a unique order ID
    return `${Math.floor(Math.random() * 10000)}`;
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Cart Summary</h2>
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              <p>{product.name} - ${product.price}</p>
            </li>
          ))}
        </ul>
        <p>Total Amount: ${getTotalCartAmount()}</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <button onClick={handleOrderPlacement}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
