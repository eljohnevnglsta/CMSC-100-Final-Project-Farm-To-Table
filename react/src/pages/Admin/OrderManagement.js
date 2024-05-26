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

const updateOrder = async (transactionId, updatedData) => {
    try {
        const response = await axios.post('http://localhost:3001/update-order', { ...updatedData, transactionId });
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error.message);
    }
}

function AdminApproval(){
    const [pendingOrders, setPendingOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);

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
            const response = axios.post("http://localhost:3001/approval", { transactionId: transactionId })
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
            const response = axios.post("http://localhost:3001/disapproval", { transactionId: transactionId })

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

    return (
        <div id='ApprovalPage'>
            <Navbar links = {navElements}/>
            <div id='approval-page-body'>
                <div id='previous-orders-container'>
                    <h2>Previous Orders</h2>
                    {previousOrders.map(order => (
                        <OrderCard key={order.transactionId} order={order} />
                    ))}
                </div>

                <div>
                <h2>Pending Orders</h2>
                    {pendingOrders.map(order => (
                                <OrderCard 
                                key={order.transactionId} 
                                order={order} 
                                showButtons={true}
                                onApprove={handleApprove} 
                                onCancel={handleCancel} 
                            />
                    ))}
                </div>
            </div>
        </div>
    );
};


const navElements = [
    { title: 'Product Management', path: '/admin' },
    { title: 'User Management', path: '/user-management' },
    { title: 'Sales Report', path: '/sales-report' },
    { title: 'Profile', path: '/profile' },
]

export default AdminApproval;
