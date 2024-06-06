import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusCard from "../components/statuscard";
import Navbar from "../components/navbar";
import "../stylesheets/Order.css";

const getOrderByUser = async (email) => {
    const url = 'http://localhost:3001/show-orders-of-user';
    try {
        const response = await axios.post(url, { email: email }, {withCredentials: true, credentials: 'include'});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const cancelOrder = async (transactionId, pendings, setPendingOrders, setCancelledOrders) => {
    const url = 'http://localhost:3001/cancel-order';
    try {
        await axios.post(url, { transactionId: transactionId }, {withCredentials: true, credentials: 'include'});
        const cancelledOrder = pendings.find(order => order.transactionId === transactionId);
        setCancelledOrders(prevCancelledOrders => [...prevCancelledOrders, cancelledOrder]);
        setPendingOrders(prevPendingOrders => prevPendingOrders.filter(order => order.transactionId !== transactionId));
    } catch (error) {
        console.error('Error:', error);
    }
}

const groupOrdersByDate = (orders) => {
    const groupedOrders = {};

    orders.forEach(order => {
        const date = new Date(order.dateOrdered);
        const dateTimeString = date.toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }); // Format with hours and minutes only
        if (!groupedOrders[dateTimeString]) {
            groupedOrders[dateTimeString] = [];
        }
        groupedOrders[dateTimeString].push(order);
    });

    return Object.entries(groupedOrders).sort((a, b) => new Date(b[0]) - new Date(a[0]));
}


export default function Order(props) {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);

    useEffect(() => {
        const email = JSON.parse(localStorage.getItem('user'));
        getOrderByUser(email)
            .then(orders => {
                const cancelled = orders.filter(order => order.orderStatus === 2);
                const pending = orders.filter(order => order.orderStatus === 0);
                const completed = orders.filter(order => order.orderStatus === 1);
                setCancelledOrders(cancelled.reverse());
                setPendingOrders(pending.reverse());
                setCompletedOrders(completed.reverse());
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const groupedPendingOrders = groupOrdersByDate(pendingOrders);
    const groupedCompletedOrders = groupOrdersByDate(completedOrders);
    const groupedCancelledOrders = groupOrdersByDate(cancelledOrders);

    return (
        <div>
            <Navbar links={navElements} />
            <div className="orders-page">
                <div className="orders-body">
                    <div className="Pending">
                        <h1>Pending Orders</h1>
                        {groupedPendingOrders.map(([dateTime, orders]) => (
                            <div key={dateTime}>
                                <h2>🌱</h2>
                                {orders.map(order => (
                                    <StatusCard key={order.transactionId} item={order} isPending={true}
                                        button={<button className="cancel-btn" onClick={() => cancelOrder(order.transactionId, pendingOrders, setPendingOrders, setCancelledOrders)}>X</button>}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="Approved">
                        <h1>Approved Orders</h1>
                        {groupedCompletedOrders.map(([dateTime, orders]) => (
                            <div key={dateTime}>
                                <h2>🌱</h2>
                                {orders.map(order => (
                                    <StatusCard key={order.transactionId} item={order} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="Cancelled">
                        <h1>Cancelled Orders</h1>
                        {groupedCancelledOrders.map(([dateTime, orders]) => (
                            <div key={dateTime}>
                                <h2>🌱</h2>
                                {orders.map(order => (
                                    <StatusCard key={order.transactionId} item={order} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const navElements = [
    { title: 'Home', path: '/home' },
    { title: 'Profile', path: '/profile' },
];
