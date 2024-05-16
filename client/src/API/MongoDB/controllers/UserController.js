import mongoose from 'mongoose';

//establish database connection via mongoose
await mongoose.connect("mongodb+srv://eyevangelista1:HsId1En99PTh5M2Z@cluster0.gqe1qwj.mongodb.net/FarmToTable ");

//creates a model for Student
const User = mongoose.model('users',{
    firstName : { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    userType: { type: String, default: "customer" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    shoppingCart: [String], //array of product ids
    pastPurchases: [String] //array of product ids
});

const addUser = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.send({inserted: true});
}

const getUserbyEmail = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    res.send(user);;
}

const updateUserDetails = async (req, res) => {
    const userTemp = await User.findOne({ email: req.body.email }); 
    if (!userTemp) {
        res.send({ updated: false, message: "User not found!" });
        return;
    }

    if (req.body.firstName) userTemp.firstName = req.body.firstName;
    if (req.body.middleName) userTemp.middleName = req.body.middleName;
    if (req.body.lastName) userTemp.lastName = req.body.lastName;
    if (req.body.password) userTemp.password = req.body.password;
    if (req.body.shoppingCart) userTemp.shoppingCart = req.body.shoppingCart;
    if (req.body.pastPurchases) userTemp.pastPurchases = req.body.pastPurchases;

    try {
        await userTemp.save();
        res.send({ updated: true, message: "User details updated successfully" });
    } catch (error) {
        res.status(500).send({ updated: false, message: "Error updating user details" });
    }
}

const deleteUser = async (req, res) => {
    const userDeletetion = await User.deleteOne({email: req.body.email});
    res.send(userDeletetion);
};

const showAllUser = async (req, res) => {
    const users = await User.find({});
	res.send(users)
}

export {addUser, getUserbyEmail, updateUserDetails, deleteUser, showAllUser}
