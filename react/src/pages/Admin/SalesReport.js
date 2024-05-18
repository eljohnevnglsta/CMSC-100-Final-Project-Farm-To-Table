import React, { useEffect, useState } from 'react';
import { showAllOrders } from './OrderMethods';
import { GetAllProducts } from './ProductMethods';

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
                console.error('Error fetching data:');
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        generateReport();
    }, [orders, products, timeFrame]);

    const generateReport = () => {
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
            const totalIncome = productOrders.reduce((sum, order) => sum + (order.orderQuantity * product.productPrice), 0); // Assuming product has a `productPrice` field

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
            <h1>Sales Report</h1>
            <div>
                <button onClick={() => setTimeFrame('weekly')}>Weekly</button>
                <button onClick={() => setTimeFrame('monthly')}>Monthly</button>
                <button onClick={() => setTimeFrame('annual')}>Annual</button>
                <button onClick={() => setTimeFrame('overall')}>Overall</button>
            </div>
            <table>
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
            <h2>Total Income: {totalIncome.toFixed(2)}</h2>
        </div>
    );
};

export default SalesReport;
