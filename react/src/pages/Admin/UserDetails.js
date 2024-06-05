import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import '../../stylesheets/Admin/UserDetails.css';

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/get-user-by-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/show-orders-of-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const ordersData = await response.json();
        setOrders(ordersData);
        setFilteredOrders(ordersData); 
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserDetails();
    fetchUserOrders();
  }, [email]);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.productId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  return (
    <div>
      <Navbar links={navElements} />
      <div id="approval-page-body">
        <div id="previous-orders-container">
          {user && (
            <div className="user-details">
              <h2 className="centered-title">User Details</h2>
              <div className="user-card">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Middle Name:</strong> {user.middleName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="order-header">
                <h3 className="order-title">Orders</h3>
                <input
                  type="text"
                  placeholder="Search Product ID"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              {filteredOrders.length > 0 && (
                <div className="orders-list">
                  {filteredOrders.map(order => (
                    <div className="order-card" key={order.transactionId}>
                      <div className="text-container">
                        <p>Transaction ID: {order.transactionId}</p>
                        <p>Product ID: {order.productId}</p>
                        <p>Order Quantity: {order.orderQuantity}</p>
                        <p>Order Status: {order.orderStatus}</p>
                        <p>Date Ordered: {new Date(order.dateOrdered).toLocaleDateString()}</p>
                        <p>Time: {order.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const navElements = [
  { title: 'Back to Customers', path: '/user-management' },
  // { title: 'Order Management', path: '/order-management' },
  // { title: 'Sales Report', path: '/sales-report' },
  // { title: 'Profile', path: '/profile' },
];
