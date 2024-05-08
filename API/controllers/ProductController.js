import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://eyevangelista1:HsId1En99PTh5M2Z@cluster0.gqe1qwj.mongodb.net/FarmToTable ");

//creates a model for Student
const Product = mongoose.model('Products',{
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productType: { type: Number, enum: [1, 2], required: true }, // 1 for Crop, 2 for Poultry
    productQuantity: { type: Number, required: true }
});

const addNewProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({inserted: true});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getProductByID = async (req, res) => {
    res.send(await Product.findOne(req.body.productID));
};

const updateProductDetails = async (req, res) => {
    try {
        const product = await Product.findOne({productId: req.body.productId});
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.productName) {
            product.productName = req.body.productName;
        }
        if (req.body.productDescription) {
            product.productDescription = req.body.productDescription;
        }
        if (req.body.productType) {
            product.productType = req.body.productType;
        }
        if (req.body.productQuantity) {
            product.productQuantity = req.body.productQuantity;
        }
        res.json(await product.save());
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const productDeletetion = await Product.deleteOne({productId: req.body.productId});
    res.send(productDeletetion);
};

export {addNewProduct, getProductByID, updateProductDetails, deleteProduct}