import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getProductDetails = async (id) => {
    try {
        const response = await axios.post('http://localhost:3001/get-product-by-id', { productId: id });
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error.message);
    }
}

export default function OrderCard({ order, showButtons, onApprove, onCancel }) {
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await getProductDetails(order.productId);
            setProductDetails(details);
        };

        fetchProductDetails();
    }, [order.productId]);

    const handleApprove = () => {
        // Handle approve logic here
        if (onApprove) {
            onApprove(order.transactionId);
        }
    };

    const handleCancel = () => {
        // Handle cancel logic here
        if (onCancel) {
            onCancel(order.transactionId);
        }
    };

    if (!productDetails) {
        return <div></div>;
    }

    const getStatus = (order) => {
        switch (order.orderStatus) {
            case 0:
                return 'Pending';
            case 1:
                return 'Approved';
            case 2:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    }

    const statusLabel = getStatus(order);

    return (
        <div className="order-card">
            <img src={productDetails.productImage} alt={productDetails.productName} />
            <div id='order-details'>
                <p>{productDetails.productName}</p>
                <p>QTY: {order.orderQuantity}</p>
                <p>{order.email}</p>
            </div>
            {showButtons ? (
                <div className="order-buttons">
                    <button onClick={() => handleApprove(order.productId)}>Approve</button>
                    <button onClick={() => handleCancel(order.productId)}>Cancel</button>
                </div>
            ) : (
                <p id='order-status'>{statusLabel}</p>
            )}
        </div>
    )
}
