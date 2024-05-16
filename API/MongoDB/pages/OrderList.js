import React from 'react';

const OrderList = ({ orders }) => {
    return(
        <div>
            {orders.map(order => (
                <div key={order.transactionId}>
                <p>Transaction ID: {order.transactionId}</p>
                <p>Product ID: {order.productId}</p>
                <p>Order Quantity: {order.orderQuantity}</p>
                <p>Status: {order.orderStatus === 0 ? 'Pending' : 'Approved'}</p>
                </div>
            ))}
        </div>
    )
}

export default OrderList;