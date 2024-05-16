import { addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser } from "./controllers/UserController.js"
import { addNewProduct, getProductByID, updateProductDetails, deleteProduct, showAllProducts } from "./controllers/ProductController.js"
import { addOrder, getOrderByTransactionId, updateOrder, deleteOrder, showAllOrderFromAUser, showAllOrders } from "./controllers/OrderController.js";
import { signup, login, logout, addToCart, removeFromCart, checkout, cancelOrder } from "./actions/customer.js";
//sends the function logic from controller to the server

const router = (app) => {
    // user 
    app.post('/add-user', addUser);
    app.post('/get-user-by-email', getUserbyEmail)
    app.post('/update-user', updateUserDetails);
    app.post('/delete-user', deleteUser);
    app.post('/show-all-user', showAllUser);

    // product
    app.post('/add-product', addNewProduct)
    app.post('/get-product-by-id', getProductByID);
    app.post('/update-product', updateProductDetails);
    app.post('/delete-product', deleteProduct);
    app.post('/show-all-product', showAllProducts);

    // order
    app.post('/add-order', addOrder);
    app.post('/get-order-by-transaction-id', getOrderByTransactionId);
    app.post('/update-order', updateOrder);
    app.post('/delete-order', deleteOrder);
    app.post('/show-orders-of-user', showAllOrderFromAUser);
    app.post('/show-all-orders', showAllOrders); 

    // authentication endpoints
    app.post('/signup', signup);
    app.post('/login', login);
    app.post('/logout', logout);

    // shopping endpoints 
    app.post('/add-to-cart', addToCart);
    app.post('/remove-from-cart', removeFromCart);
    app.post('/checkout', checkout);
    app.post('/cancel-order', cancelOrder);
}

export default router;