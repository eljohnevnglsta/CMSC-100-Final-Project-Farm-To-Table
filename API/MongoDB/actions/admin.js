import { Order } from "../controllers/OrderController.js";
import { Product } from "../controllers/ProductController.js";

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

        completeorder.orderStatus = 1;
        
        const updateproduct = await Product.findOne({productId: completeorder.productId});

        if(updateproduct.quantity > 0)
        {
            updateproduct.quantity = updateproduct.quantity - 1;

        }
        else
        {
            res.send({ status: false, message: "There are no more products left"});
            return;           
        }

        await completeorder.save();
        await updateproduct.save();

        res.send({ status: true, message: "Order approved successfully"});
        
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

