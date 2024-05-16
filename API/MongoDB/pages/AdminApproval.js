import React, { useState, useEffect } from 'react';
import OrderList from './OrderList.js'

function ApprovalPage(){
    const[orders, setOrders] = useState([]);
    const[weeklySales, setWeeklySales] = useState(0);
    const[monthlySales, setMonthlySales] = useState(0);
    const[annualSales, setAnnualSales] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = () => {
        fetch('http://localhost:3001/show-all-orders')
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error => console.error('Error:', error));
    };

    // FOR SALES REPORT
    const calculateSales = (ordersData) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentWeek = getWeekNumber(currentDate);
    
        let weeklyTotal = 0;
        let monthlyTotal = 0;
        let annualTotal = 0;
    
        ordersData.forEach(order => {
            const orderDate = new Date(order.dateOrdered);
            const orderYear = orderDate.getFullYear();
            const orderMonth = orderDate.getMonth() + 1;
            const orderWeek = getWeekNumber(orderDate);
    
            if(currentYear === orderYear){
                annualTotal += order.orderQuantity;
                if(currentMonth === orderMonth){
                    monthlyTotal += order.orderQuantity;
                    if(currentWeek === orderWeek){
                        weeklyTotal += order.orderQuantity; }
                }
            }
        });

        setWeeklySales(weeklyTotal);
        setMonthlySales(monthlyTotal);
        setAnnualSales(annualTotal);
    };

    return (
        <div>
            <h1>Admin</h1>

            <h2>Previous Orders</h2>
            <OrderList orders={orders.filter(order => order.orderStatus !== 0)} />
            <h2>Pending Orders for Approval</h2>
            <OrderList orders={orders.filter(order => order.orderStatus === 0)} />

            <h2>Sales Report</h2>
                <p>Weekly Sales: 
                    {weeklySales} </p>
                <p>Monthly Sales: 
                    {monthlySales} </p>
                <p>Annual Sales: 
                    {annualSales} </p>
        </div>
    );
}

export default ApprovalPage