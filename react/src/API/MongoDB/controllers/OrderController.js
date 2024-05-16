import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://eyevangelista1:HsId1En99PTh5M2Z@cluster0.gqe1qwj.mongodb.net/FarmToTable ");

export const Order = mongoose.model('order',{
    transactionId: {
        type: String,
        unique: true,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    orderQuantity: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: Number,
        enum: [0, 1, 2],
        default: 0 // Default value is set to 0 (Pending)
    },
    email: {
        type: String,
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String // Assuming time will be stored as a string
    }
});

export const addOrder = async (req, res) => {
    if (!(req.body.transactionId && req.body.productId && req.body.orderQuantity && req.body.orderStatus && req.body.email && req.body.dateOrdered && req.body.time)){
        res.send({inserted: false, message: "Empty Field Detected"});
        return;
    }   
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.send({inserted: true});
}

export const getOrderByTransactionId = async (req, res) => {
    res.send(await Order.findOne({transactionId: req.body.transactionId}));
}

//only status and quantity can be updated
export const updateOrder = async (req, res) => {
    const orderTemp = await Order.findOne({transactionId: req.body.transactionId});
    if (!orderTemp){
        res.send({ updated: false, message: "Order not found!" });
        return;
    }
    
    if (req.body.orderQuantity) orderTemp.orderQuantity = req.body.orderQuantity;
    if (req.body.orderStatus) orderTemp.orderStatus = req.body.orderStatus;

    try {
        await orderTemp.save();
        res.send({ updated: true, message: "Order details updated successfully" });
    } catch (error) {
        res.status(500).send({ updated: false, message: "Error updating order details" });
    }
}

export const deleteOrder = async (req, res) => {
    res.send(await Order.deleteOne({transactionId: req.body.transactionId}))
}

export const showAllOrderFromAUser = async (req, res) => {
    res.send(await Order.find({email: req.body.email}))
}

export const showAllOrders = async (req, res) => {
    res.send(await Order.find({}))
}