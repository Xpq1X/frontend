import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost/api/orders', {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const handlePay = async (id) => {
    try {
      await axios.post(`http://localhost/api/orders/${id}/pay`, {}, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Paid:</strong> {order.paid ? '✅ Yes' : '❌ No'}</p>
            {!order.paid && (
              <button className="pay-button" onClick={() => handlePay(order.id)}>Pay</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
