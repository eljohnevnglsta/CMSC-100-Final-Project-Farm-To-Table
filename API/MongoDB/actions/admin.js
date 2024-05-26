import { Order } from "../controllers/OrderController.js";
import { Product } from "../controllers/ProductController.js";
import { User } from "../controllers/UserController.js";

export const approval = async (req, res) => {
    try {
        const { transactionId } = req.body;
        
        const completeorder = await Order.findOne({transactionId: transactionId});

        if (!completeorder) {
            res.send({ status: false, message: "The order does not exist"});
            return;
        }

        if (completeorder.status == 2) {
            res.send({ status: false, message: "The order has already been cancelled"});
            return;
        }

        const updateproduct = await Product.findOne({productId: completeorder.productId});

        if (updateproduct.productQuantity < completeorder.orderQuantity){
            res.send({ status: false, message: `Product ${updateproduct.productId} has insufficient stock`});
            completeorder.orderStatus = 2;
            return;           
        }

        updateproduct.productQuantity -= completeorder.orderQuantity;
        completeorder.orderStatus = 1;
        await completeorder.save();
        await updateproduct.save();

        res.send({ status: true, message: "Order approved successfully"});
        
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

export const disapproval = async (req, res) => {
    try {
        const { transactionId } = req.body;
        
        const completeorder = await Order.findOne({transactionId: transactionId});

        if (!completeorder) {
            res.send({ status: false, message: "The order does not exist"});
            return;
        }

        if (completeorder.status == 2) {
            res.send({ status: false, message: "The order has already been cancelled"});
            return;
        }

        completeorder.orderStatus = 2;
        await completeorder.save();

        res.send({ status: true, message: "Order disapproved successfully"});
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }

}