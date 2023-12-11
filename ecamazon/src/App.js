import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Shop from './Shop';
import Cart from './Cart';
import { ShopContextProvider } from './shop-context'; // Import the ShopContextProvider
import Checkout from './Checkout';
import OrdersPage from './Orders';
import './styles.css';

const App = () => {
  return (
    <ShopContextProvider> {/* Wrap your components with ShopContextProvider */}
      <Router>
        <div className="navbar">
          <ul>
            <li>
              <Link to="/" className="nav-link">Shop</Link>
            </li>
            <li>
              <Link to="/Cart" className="nav-link">Cart</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrdersPage />} />

        </Routes>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
