import React, { useState } from 'react';
import { useShopContext } from './shop-context';
import { useNavigate } from 'react-router-dom';
import './LoadingSpinner.css'; // Import your CSS file for styling

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount, clearCart } = useShopContext();
  const [clientName, setClientName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userId, setUserId] = useState(null); // State to store user ID

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Connexion réussie
        console.log('Connexion réussie, ID de utilisateur :', data.id);

        // Mettre à jour l'état ou effectuer d'autres actions après la connexion réussie
        setClientName(username); // Par exemple, définir le nom du client après la connexion réussie
        setUserId(data.id);

      } else {
        // Gérer les erreurs de connexion
        throw new Error(data.error || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Échec de la connexion :', error.message);
      setLoginError(error.message); // Définir l'erreur de connexion pour l'afficher à l'utilisateur
    }
  };
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
        clientName: username
      };
  
      // Replace this with your actual API call to store the order
      fetch('http://localhost:5000/api/orders/storeOrder', {
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
        {clientName ? (
          <p>Logged in as: {clientName}</p>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          </form>
        )}
        {userId && <p>User ID: {userId}</p>} {/* Display user ID */}
        
        <button onClick={handleOrderPlacement}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
