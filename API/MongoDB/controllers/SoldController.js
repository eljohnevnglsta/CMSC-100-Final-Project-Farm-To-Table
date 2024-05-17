import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://eyevangelista1:HsId1En99PTh5M2Z@cluster0.gqe1qwj.mongodb.net/FarmToTable ");

export const Sold = mongoose.model('sold',{
    productId: {
        type: String,
        required: true
    },
    productName: {
         type: String, required: true 
    },
    productDescription: {
        type: String, required: true 
    },
    productType: { 
        type: Number, enum: [1, 2], required: true 
    },
    soldQuantity: {
        type: Number,
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
});


export const getSoldByProductId = async (req, res) => {
    res.send(await Sold.findOne({productId: req.body.productId}));
}

export const showAllSold = async (res) => {
    res.send(await Sold.find({}))
}

export const deleteSold = async (req, res) => {
    res.send(await Sold.deleteOne({productId: req.body.productId}))
}

export const addSold = async (req, res) => {
    try {
        const sold = new Sold(req.body);
        await sold.save();
        res.status(201).json({inserted: true});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateSoldDetails = async (req, res) => {
    try {
        const sold = await Sold.findOne({productId: req.body.productId});
        if (sold == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.productName) {
            sold.productName = req.body.productName;
        }
        if (req.body.productDescription) {
            sold.productDescription = req.body.productDescription;
        }
        if (req.body.productType) {
            sold.productType = req.body.productType;
        }
        if (req.body.soldQuantity) {
            sold.soldQuantity = req.body.soldQuantity;
        }
        if (req.body.dateOrdered) {
            sold.dateOrdered = req.body.dateOrdered;
        }
        res.json(await product.save());
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};