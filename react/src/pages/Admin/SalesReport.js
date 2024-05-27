import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../stylesheets/Admin/SalesReport.css';

const showAllOrders = async () => {
    try {
        const response = await axios.post('http://localhost:3001/show-all-orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.message);
    }
}

const GetAllProducts = async () => {
    try {
        const response = await axios.post('http://localhost:3001/show-all-product');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}

const SalesReport = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [report, setReport] = useState([]);
    const [timeFrame, setTimeFrame] = useState('overall');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allOrders = await showAllOrders();
                const allProducts = await GetAllProducts();
                setOrders(allOrders);
                setProducts(allProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        generateReport();
    }, [orders, products, timeFrame]);

    const generateReport = () => {
        if (!orders || !products) {
            // orders or products are not yet available, do nothing
            return;
        }

        console.log(`Generating report for timeframe: ${timeFrame}`);
        const now = new Date();
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.dateOrdered);
            switch (timeFrame) {
                case 'weekly':
                    const oneWeekAgo = new Date(now);
                    oneWeekAgo.setDate(now.getDate() - 7);
                    return orderDate >= oneWeekAgo;
                case 'monthly':
                    const oneMonthAgo = new Date(now);
                    oneMonthAgo.setMonth(now.getMonth() - 1);
                    return orderDate >= oneMonthAgo;
                case 'annual':
                    const oneYearAgo = new Date(now);
                    oneYearAgo.setFullYear(now.getFullYear() - 1);
                    return orderDate >= oneYearAgo;
                default:
                    return true;
            }
        });

        const productSales = products.map(product => {
            const productOrders = filteredOrders.filter(order => order.productId === product.productId);
            const totalSales = productOrders.reduce((sum, order) => sum + order.orderQuantity, 0);
            const totalIncome = productOrders.reduce((sum, order) => sum + (order.orderQuantity * product.productPrice), 0);

            return {
                ...product,
                totalSales,
                totalIncome,
            };
        });

        setReport(productSales);
    };

    const totalIncome = report.reduce((sum, product) => sum + product.totalIncome, 0);

    return (
        <div>
            <Navbar links={navElements} />  
            <div class="sales-report-container">
                <h1 class="sales-report-heading">Sales Report</h1>
                <div class="timeframe-buttons">
                    <button class="timeframe-button" onClick={() => setTimeFrame('weekly')}>Weekly</button>
                    <button class="timeframe-button" onClick={() => setTimeFrame('monthly')}>Monthly</button>
                    <button class="timeframe-button" onClick={() => setTimeFrame('annual')}>Annual</button>
                    <button class="timeframe-button" onClick={() => setTimeFrame('overall')}>Overall</button>
                </div>
                <table class="sales-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Total Sales</th>
                            <th>Total Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.totalSales}</td>
                                <td>{product.totalIncome.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 class="total-income">Total Income: {totalIncome.toFixed(2)}</h2>
            </div>
        </div>
    );
};

const navElements = [
    { title: 'Product Management', path: '/admin' },
    { title: 'User Management', path: '/user-management' },
    { title: 'Order Management', path: '/order-management' },
    { title: 'Profile', path: '/profile' }
]; 

export default SalesReport;
