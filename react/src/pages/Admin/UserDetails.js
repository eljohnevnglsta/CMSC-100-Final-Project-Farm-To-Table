import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/Admin/UserDetails.css';
import OrderCard from '../../components/ordercard';
import axios from 'axios';

const getProductDetails = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/get-product-by-id', { productId: id });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error.message);
  }
}

export default function UserDetails(props) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const email = props.email;  
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
        const sortedOrders = ordersData.sort((a, b) => new Date(b.dateOrdered) - new Date(a.dateOrdered));
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders); 
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserDetails();
    fetchUserOrders();
  }, [email]);

  useEffect(() => {
    const filterOrders = async () => {
      if (searchQuery === '') {
        setFilteredOrders(orders);
      } else {
        const filtered = await Promise.all(
          orders.map(async (order) => {
            const product = await getProductDetails(order.productId);
            if (searchQuery && product.productName) {
              return product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ? order : null;
            }
            return null;
          })
        );
        setFilteredOrders(filtered.filter(order => order !== null));
      }
    };
    filterOrders();
  }, [searchQuery, orders]);

  const groupOrdersByDate = (orders) => {
    return orders.reduce((acc, order) => {
      const orderDate = new Date(order.dateOrdered);
      const dateKey = orderDate.toLocaleDateString();
      const timeKey = orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const key = `${dateKey} ${timeKey}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrdersByDate(filteredOrders);

  return (
    <div className="user-details-popup" style={{ width: props.width, height: props.height }}>
      <button className="close-button" onClick={props.closePopup}>X</button>
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
              placeholder="Search Product"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {Object.keys(groupedOrders).length > 0 ? (
            <div className="orders-list">
              {Object.keys(groupedOrders).map(dateTime => (
                <div key={dateTime}>
                  <h4>{dateTime}</h4>
                  {groupedOrders[dateTime].map(order => (
                    <OrderCard key={order.transactionId} order={order} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
}
