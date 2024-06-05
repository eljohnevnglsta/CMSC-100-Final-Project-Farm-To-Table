import { User } from "../controllers/UserController.js";
import { Order } from "../controllers/OrderController.js";
import { Product } from "../controllers/ProductController.js";
import { hashPassword, generateToken, comparePassword } from "./auth.js";

function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (!(firstName && lastName && email && password && confirmPassword)) {
            res.send({status: false, message: "Please provide all required fields"});
            return;
        }
    
        if (!isValidEmail(email)) {
            res.send({ status: false, message: "Invalid email address"});
            return;
        }
    
        const existingUser = await User.findOne({email: email});
    
        if (existingUser) {
            res.send({ status: false, message: "User with this email already exists"});
            return;
        }
    
        if (password !== confirmPassword) {
            res.send({ status: false, message: "Passwords do not match"});
            return;
        }
    
        delete req.body.confirmPassword;
        req.body.password = await hashPassword(password);

        generateToken(req.body._id, res); // Generate token for user
    
        const newUser = new User(req.body);
        await newUser.save();
        res.send({ status: true, message: "User signed up successfully"});

    } catch (error) {       
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!isValidEmail(email)) {
            res.send({ status: false, message: "Invalid email address"});
            return;
        }
    
        const existingUser = await User.findOne({email: email});
        
        if (!existingUser) {
            res.send({ status: false, message: "User with this email does not exist"});
            return;
        }
    
        const isPasswordMatch = await comparePassword(password, existingUser.password);
    
        if (!isPasswordMatch) {
            res.send({ status: false, message: "Invalid password"});
            return;
        }
    
        generateToken(existingUser._id, res); // Generate token for user
        res.send({ status: true, message: "User logged in successfully"});

    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.send({ status: true, message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const updatedCartItems = async (req, res) => {
    try {
        const { email, shoppingCart } = req.body;
        const existingUser = await User.findOne({email: email})
        if (!existingUser) {
            res.send({ status: false, message: "User not found" });
            return;
        }

        existingUser.shoppingCart = shoppingCart;
        await existingUser.save();
        res.send({ status: true, message: "Cart updated successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const checkout = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const existingUser = await User.findOne({email: email});

        if (existingUser.shoppingCart.length === 0) {
            res.send({ status: false, message: "Cart is empty" });
            return;
        }

        const allTransactions = await Order.find({});

        //get the highest transactionId
        var index = Math.max(...allTransactions.map(transaction => parseInt(transaction.transactionId, 10))) + 1;
        const cart = existingUser.shoppingCart; 
        
        for (let i = 0; i < cart.length; i++) {
            const product = await Product.findOne({productId: cart[i].productId});
            
            var status = 0;
            if (product.productQuantity < cart[i].quantity) {
                status = 2;
            }

            let order = {
                transactionId: index,
                productId: cart[i].productId,
                orderQuantity: cart[i].quantity,
                orderStatus: status,
                email: email,
                dateOrdered: Date.now(),
                time: new Date().toLocaleTimeString()
            }

            index++;
            let newOrder = new Order(order);
            await newOrder.save();
        }

        existingUser.shoppingCart = [];
        existingUser.save();
    
        res.send({ status: true, message: "Orders placed successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error });
    }
}

export const cancelOrder = async (req, res) => {
    try {
        const { transactionId } = req.body;
        const order = await Order.findOne({transactionId: transactionId});
        if (!order) {
            res.send({ status: false, message: "Order not found" });
            return;
        }

        order.orderStatus = 2;
        await order.save();
        res.send({ status: true, message: "Order cancelled successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}