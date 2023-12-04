import React, { useState, useEffect } from 'react';
import { useShopContext } from './shop-context';
import './LoadingSpinner.css'; // Import your CSS file for styling

const Checkout = () => {
  const { cartItems, getTotalCartAmount } = useShopContext();
  const [isLoading, setIsLoading] = useState(false);
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    // Simulating payment processing with API call
    setIsLoading(true);
    // Perform API call for payment verification here
    setTimeout(() => {
      // Simulating API response delay
      setIsLoading(false);
    }, 3000); // Simulating a 3-second delay
  }, []);

  const handleOrderPlacement = () => {
    // You can perform the payment API call here and then proceed to store the order
    // Replace this setTimeout with your actual API call for payment
    setTimeout(() => {
      // Simulating a successful payment
      const orderData = {
        orderId: generateOrderId(), // Replace with your method to generate an order ID
        articles: cartItems,
        amount: getTotalCartAmount(),
        clientName: clientName
      };

      // Replace this with your actual API call to store the order
      fetch('http://localhost:4000/storeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
        .then(response => {
          // Handle response if needed
          console.log('Order placed successfully!');
        })
        .catch(error => {
          console.error('Error placing order:', error);
        });
    }, 1000); // Simulating a 1-second delay before placing the order
  };

  const generateOrderId = () => {
    // Replace this with your method to generate a unique order ID
    return `ORDER-${Math.floor(Math.random() * 10000)}`;
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Processing your payment...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Checkout;
