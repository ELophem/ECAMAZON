import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState('');

  useEffect(() => {
    // Fetch orders when component mounts
    axios.get('http://localhost:4000/api/orders/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDeleteOrder = () => {
    // Make a DELETE request to delete the order by orderIdToDelete
    axios.delete(`http://localhost:4000/api/orders/deleteOrder/${orderIdToDelete}`)
      .then(response => {
        console.log('Order deleted successfully');
        // Refresh the orders list after deletion
        axios.get('http://localhost:4000/api/orders/orders')
          .then(response => {
            setOrders(response.data);
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            {/* Display order details */}
            Order ID: {order.order_id}, Articles: {order.articles}, Amount: {order.amount}, Client Name: {order.client_name}
          </li>
        ))}
      </ul>
      
      <div>
        <h2>Delete Order</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleDeleteOrder();
        }}>
          <label>
            Order ID to Delete:
            <input
              type="text"
              value={orderIdToDelete}
              onChange={(e) => setOrderIdToDelete(e.target.value)}
            />
          </label>
          <button type="submit">Delete Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrdersPage;
