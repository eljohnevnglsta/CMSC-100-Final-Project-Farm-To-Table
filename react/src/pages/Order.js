import axios from "axios";
import StatusCard from "../components/statuscard";
import Navbar from "../components/navbar";
import "../stylesheets/Order.css";
import { useState, useEffect, react } from "react";

const getOrderByUser = async (email) => {
    const url = 'http://localhost:3001/show-orders-of-user';
    try {
        const response = await axios.post(url, {email: email});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const cancelOrder = async (transactionId, pendings, setPendingOrders, setCancelledOrders) => {
    const url = 'http://localhost:3001/cancel-order';
    try {
        await axios.post(url, {transactionId: transactionId});
        const cancelledOrder = pendings.find(order => order.transactionId === transactionId);
        setCancelledOrders(prevCancelledOrders => [...prevCancelledOrders, cancelledOrder]);
        setPendingOrders(prevPendingOrders => prevPendingOrders.filter(order => order.transactionId !== transactionId));
    } catch (error) {
        console.error('Error:', error);
    }
}

export default function Order(props) {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);

    useEffect(() => {
        const email = JSON.parse(sessionStorage.getItem('user'));
        getOrderByUser(email)
            .then(orders => {
                const cancelled = orders.filter(order => order.orderStatus === 2);
                const pending = orders.filter(order => order.orderStatus === 0);
                const completed = orders.filter(order => order.orderStatus === 1);
                setCancelledOrders(cancelled);
                setPendingOrders(pending);
                setCompletedOrders(completed);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
    <div className="orders-page">
        <Navbar links={navElements} />
        <div className="orders-body">
            <div className="Pending">
                <h1>Pending Orders</h1>
                {pendingOrders.map(order => 
                <div key={order.transactionId}>
                    <StatusCard item={order}/>
                    <button onClick={() => cancelOrder(order.transactionId, pendingOrders, setPendingOrders, setCancelledOrders)}>Cancel Order</button>
                </div>
                )}
            </div>
            <div className="Approved">
                <h1>Approved Orders</h1>
                {completedOrders.map(order => 
                <div key={order.transactionId}>
                    <StatusCard item={order}/>
                </div>
                )}
            </div>
            <div className="Cancelled">
                <h1>Cancelled Orders</h1>
                {cancelledOrders.map(order => 
                <div key={order.transactionId}>
                    <StatusCard item={order}/>
                </div>
                )}
            </div>
        </div>
    </div>
    );
}

const navElements = [
    {title: 'Home', path: '/home'},
    {title: 'Profile', path: '/profile'},
];
