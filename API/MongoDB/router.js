import { addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser } from "./controllers/UserController.js"
import { addSold, getSoldByProductId, deleteSold,showAllSold, updateSoldDetails } from "./controllers/SoldController.js"
import { addNewProduct, getProductByID, updateProductDetails, deleteProduct, showAllProducts } from "./controllers/ProductController.js"
import { addOrder, getOrderByTransactionId, updateOrder, deleteOrder, showAllOrderFromAUser, showAllOrders } from "./controllers/OrderController.js";
import { signup, login, logout, checkout, cancelOrder, updatedCartItems } from "./actions/customer.js";
import { approval, disapproval } from "./actions/admin.js";
import { verifyToken } from "./actions/auth.js";
//sends the function logic from controller to the server

const router = (app) => {
    // user 
    app.post('/add-user',verifyToken, addUser);
    app.post('/get-user-by-email', getUserbyEmail)
    app.post('/update-user',verifyToken, updateUserDetails);
    app.post('/delete-user',verifyToken, deleteUser);
    app.post('/show-all-user',verifyToken, showAllUser);

    // product
    app.post('/add-product',verifyToken, addNewProduct)
    app.post('/get-product-by-id',verifyToken, getProductByID);
    app.post('/update-product',verifyToken, updateProductDetails);
    app.post('/delete-product',verifyToken, deleteProduct);
    app.post('/show-all-product',verifyToken, showAllProducts);

    // order
    app.post('/add-order',verifyToken, addOrder);
    app.post('/get-order-by-transaction-id',verifyToken, getOrderByTransactionId);
    app.post('/update-order',verifyToken, updateOrder);
    app.post('/delete-order',verifyToken, deleteOrder);
    app.post('/show-orders-of-user',verifyToken, showAllOrderFromAUser);
    app.post('/show-all-orders',verifyToken, showAllOrders); 

    // authentication endpoints
    app.post('/signup', signup);
    app.post('/login', login);
    app.post('/logout', logout);

    // shopping endpoints 
    app.post('/update-cart',verifyToken, updatedCartItems);
    app.post('/checkout',verifyToken, checkout);
    app.post('/cancel-order',verifyToken, cancelOrder);

    //admin endpoints
    app.post('/approval',verifyToken, approval);
    app.post('/disapproval',verifyToken, disapproval);

    // sold products
    app.post('/get-sold-by-product-id',verifyToken, getSoldByProductId);
    app.post('/show-all-sold',verifyToken, showAllSold);
    app.post('/delete-sold',verifyToken, deleteSold);
    app.post('/update-sold-details',verifyToken, updateSoldDetails);
    app.post('/show-all-sold',verifyToken, showAllSold);
    app.post('/show-all-sold',verifyToken, addSold);

}

export default router;