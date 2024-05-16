import { addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser } from "./controllers/UserController.js";
import { addNewProduct, getProductByID, updateProductDetails, deleteProduct, showAllProducts } from "./controllers/ProductController.js";
import { addOrder, getOrderByTransactionId, updateOrder, deleteOrder, showAllOrderFromAUser, showAllOrders } from "./controllers/OrderController.js";
import { signup, login, logout } from "../CustomerActions.js";

const router = (app) => {
    // user routes
    app.post('/add-user', addUser);
    app.post('/get-user-by-email', getUserbyEmail);
    app.post('/update-user', updateUserDetails);
    app.post('/delete-user', deleteUser);
    app.post('/show-all-user', showAllUser);

    // product routes
    app.post('/add-product', addNewProduct);
    app.post('/get-product-by-id', getProductByID);
    app.post('/update-product', updateProductDetails);
    app.post('/delete-product', deleteProduct);
    app.post('/show-all-product', showAllProducts);

    // order routes
    app.post('/add-order', addOrder);
    app.post('/get-order-by-transaction-id', getOrderByTransactionId);
    app.post('/update-order', updateOrder);
    app.post('/delete-order', deleteOrder);
    app.post('/show-orders-of-user', showAllOrderFromAUser);
    app.post('/show-all-orders', showAllOrders);

    // login and signup routes
    app.post('/signup', async (req, res) => {
        try {
            const userData = req.body;
            const signupResult = await signup(userData, res);
            res.json(signupResult);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    });

    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const loginResult = await login(email, password, res);
            res.json(loginResult);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    });

    app.post('/logout', async (req, res) => {
        try {
            logout(res);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    });
};

export default router;
