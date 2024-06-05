import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import axios from 'axios';
import '../../stylesheets/Admin/OrderManagement.css';
import OrderCard from '../../components/ordercard';

const showAllOrders = async () => {
    try {
        const response = await axios.post('http://localhost:3001/show-all-orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.message);
    }
}

function groupOrdersByUserAndDate(orders) {
    const grouped = {};

    orders.forEach(order => {
        const userEmail = order.email;
        const orderDate = new Date(order.dateOrdered).toDateString();

        if (!grouped[userEmail]) {
            grouped[userEmail] = {};
        }

        if (!grouped[userEmail][orderDate]) {
            grouped[userEmail][orderDate] = [];
        }

        grouped[userEmail][orderDate].push(order);
    });

    return grouped;
}

function AdminApproval() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [dropdownState, setDropdownState] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const allOrders = await showAllOrders();
                setPendingOrders(allOrders.filter(order => order.orderStatus === 0));
                setPreviousOrders(allOrders.filter(order => order.orderStatus !== 0));
            } catch (err) {
                console.error('Error fetching data:', err.message);
            }
        };
        fetchOrders();
    }, []);

    const handleApprove = async (transactionId) => {
        try {
            const response = await axios.post("http://localhost:3001/approval", { transactionId: transactionId })
            console.log(response.data);
            if (response.data.status === false) {
                console.error(response.data.message);
                return;
            }

            setPendingOrders(prevOrders => prevOrders.filter(order => order.transactionId !== transactionId));
            setPreviousOrders(prevOrders => [...prevOrders, { ...prevOrders.find(order => order.transactionId === transactionId), orderStatus: 1 }]);
        } catch (err) {
            console.error('Error approving order:', err.message);
        }
    };

    const handleCancel = async (transactionId) => {
        try {
            const response = await axios.post("http://localhost:3001/disapproval", { transactionId: transactionId })

            if (response.data.status === false) {
                console.error(response.data.message);
                return;
            }

            setPendingOrders(prevOrders => prevOrders.filter(order => order.transactionId !== transactionId));
            setPreviousOrders(prevOrders => [...prevOrders, { ...prevOrders.find(order => order.transactionId === transactionId), orderStatus: 2 }]);
        } catch (err) {
            console.error('Error cancelling order:', err.message);
        }
    };

    const toggleDropdown = (user, type) => {
        setDropdownState(prevState => ({
            ...prevState,
            [user]: {
                ...prevState[user],
                [type]: !prevState[user]?.[type]
            }
        }));
    };

    const groupedPendingOrders = groupOrdersByUserAndDate(pendingOrders);
    const groupedPreviousOrders = groupOrdersByUserAndDate(previousOrders);

    return (
        <div id='ApprovalPage'>
            <Navbar links={navElements} />
            <div id='approval-page-body'>
                <div className='orders-container'>
                    <h2>Previous Orders</h2>
                    {Object.keys(groupedPreviousOrders).filter(user => Object.keys(groupedPreviousOrders[user]).length > 0).map(user => (
                        <div className='user-container' key={user}>
                            <div className='user-header' onClick={() => toggleDropdown(user, 'previous')}>
                                <h3>{user}</h3>
                                <span>{dropdownState[user]?.previous ? '▲' : '▼'}</span>
                            </div>
                            {dropdownState[user]?.previous && Object.keys(groupedPreviousOrders[user]).map(date => (
                                <div className='order-date-container' key={date}>
                                    <h4>{date}</h4>
                                    {groupedPreviousOrders[user][date].map(order => (
                                        <OrderCard key={order.transactionId} order={order} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className='orders-container'>
                    <h2>Pending Orders</h2>
                    {Object.keys(groupedPendingOrders).filter(user => Object.keys(groupedPendingOrders[user]).length > 0).map(user => (
                        <div className='user-container' key={user}>
                            <div className='user-header' onClick={() => toggleDropdown(user, 'pending')}>
                                <h3>{user}</h3>
                                <span>{dropdownState[user]?.pending ? '▲' : '▼'}</span>
                            </div>
                            {dropdownState[user]?.pending && Object.keys(groupedPendingOrders[user]).map(date => (
                                <div className='order-date-container' key={date}>
                                    <h4>{date}</h4>
                                    {groupedPendingOrders[user][date].map(order => (
                                        <OrderCard
                                            key={order.transactionId}
                                            order={order}
                                            showButtons={true}
                                            onApprove={handleApprove}
                                            onCancel={handleCancel}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const navElements = [
    { title: 'Product Management', path: '/admin' },
    { title: 'User Management', path: '/user-management' },
    { title: 'Sales Report', path: '/sales-report' },
    { title: 'Profile', path: '/profile' },
]

export default AdminApproval;
