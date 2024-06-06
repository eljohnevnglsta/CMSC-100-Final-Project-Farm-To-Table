import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import BarChart from '../../components/barchart';
import '../../stylesheets/Admin/SalesReport.css';

const showAllOrders = async () => {
    try {
        const response = await axios.post('http://localhost:3001/show-all-orders', {}, {
            withCredentials: true,
            credentials: 'include'
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.message);
    }
};

const GetAllProducts = async () => {
    try {
        const response = await axios.post('http://localhost:3001/show-all-product', {}, {
            withCredentials: true,
            credentials: 'include'
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
};

const SalesReport = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [report, setReport] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
    }, [orders, products, startDate, endDate]);

    const generateReport = () => {
        if (!orders.length || !products.length || !startDate || !endDate) {
            // Orders, products, or dates are not yet available, do nothing
            console.log('Orders, products, or date range not set');
            return;
        }

        console.log(`Generating report for date range: ${startDate} to ${endDate}`);
        
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.dateOrdered);
            return orderDate >= start && orderDate <= end;
        });

        const productSales = products.map(product => {
            const productOrders = filteredOrders.filter(order => order.productId === product.productId && order.orderStatus === 1);
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
            <div className="sales-report-container">
                <h1 className="sales-report-heading">Sales Report</h1>
                <div className="date-range-inputs">
                    <label>
                        Start Date:
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                    </label>
                    <label>
                        End Date:
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                        />
                    </label>
                </div>
                <BarChart report={report} />
                <table className="sales-table">
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
                                <td>${product.totalIncome.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="total-income">Total Income: ${totalIncome.toFixed(2)}</h2>
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
