import needle from "needle";

const baseURL = 'http://localhost:3001'; // Assuming your server is running locally on port 3001

// Method to add an order
export const addOrder = async (orderData) => {
    const response = await needle('post', `${baseURL}/add-order`, orderData);
    console.log(response.body);
    return response.body
};

// Method to get order by transaction id
export const getOrderByTransactionId = async (transactionId) => {
    const response = await needle('post', `${baseURL}/get-order-by-transaction-id`, { transactionId: transactionId });
    console.log(response.body);
    return response.body
};

// Method to update an order
export const updateOrder = async (transactionId, orderData) => {
    const data = { ...orderData, transactionId };
    const response = await needle('post', `${baseURL}/update-order`, data);
    console.log(response.body);
    return response.body
};

// Method to delete an order
export const deleteOrder = async (transactionId) => {
    const response = await needle('post', `${baseURL}/delete-order`, { transactionId: transactionId });
    console.log(response.body);
    return response.body
};

// Method to show all orders of a user
export const showAllOrderFromAUser = async (email) => {
    const response = await needle('post', `${baseURL}/show-orders-of-user`, { email: email });
    console.log(response.body);
    return response.body
};

// Method to show all orders
export const showAllOrders = async () => {
    const response = await needle('post', `${baseURL}/show-all-orders`);
    console.log(response.body);
    return response.body
};

// function calls example
// addOrder({
//     transactionId: '123457',
//     productId: 'product123',
//     orderQuantity: 5,
//     orderStatus: 0,
//     email: 'test@example.com',
//     dateOrdered: Date.now(),
//     time: new Date().toLocaleTimeString()
// });
// getOrderByTransactionId('123457');
// updateOrder('123456', { orderQuantity: 10, orderStatus: 1 });
// deleteOrder('123457');
// showAllOrderFromAUser('test@example.com');
// showAllOrders();