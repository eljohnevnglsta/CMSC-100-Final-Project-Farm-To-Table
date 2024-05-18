import React, { useState, useEffect } from 'react';
import { showAllOrders, updateOrder } from '../MongoDB/needle_methods/OrderMethods.js';

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
                console.error('Error fetching data:');
            }
        };

        fetchOrders();
    }, []);

    const handleApprove = async (transactionId) => {
        try {
            await updateOrder(transactionId, { orderStatus: 1 });
            setOrders(prevOrders => prevOrders.map(order => 
                order.transactionId === transactionId ? { ...order, orderStatus: 1 } : order
            ));
        } catch (err) {
            console.error('Error approving order:', err.message);
        }
    };
    
    const handleCancel = async (transactionId) => {
        try {
            await updateOrder(transactionId, { orderStatus: 2 });
            setOrders(prevOrders => prevOrders.map(order => 
                order.transactionId === transactionId ? { ...order, orderStatus: 2 } : order
            ));
        } catch (err) {
            console.error('Error cancelling order:', err.message);
        }
    };

    return (
        <div>
            <h1>Admin Approval Page</h1>

            <h2>Previous Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {previousOrders.map(order => (
                        <tr key={order.transactionId}>
                            <td>{order.transactionId}</td>
                            <td>{order.productId}</td>
                            <td>{order.orderQuantity}</td>
                            <td>{order.orderStatus === 1 ? 'Approved' : 'Cancelled'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Pending Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingOrders.map(order => (
                        <tr key={order.transactionId}>
                            <td>{order.transactionId}</td>
                            <td>{order.productId}</td>
                            <td>{order.orderQuantity}</td>
                            <td>Pending</td>
                            <td>
                                <button onClick={() => handleApprove(order.transactionId)}>Approve</button>
                                <button onClick={() => handleCancel(order.transactionId)}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );

};

export default AdminApproval