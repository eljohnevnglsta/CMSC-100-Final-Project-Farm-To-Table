import { AddUser, GetUserByEmail } from "./MongoDB/needle_methods/UserMethods.js";
import { hashPassword, comparePassword } from "./Authentication.js";
import { generateToken } from "./Authentication.js";

// firstName : { type: String, required: true },
// middleName: { type: String, required: true },
// lastName: { type: String, required: true }, 
// userType: { type: String, default: "customer" },
// email: { type: String, unique: true },
// password: { type: String, required: true },
// shoppingCart: [String], //array of product ids
// pastPurchases: [String] //array of product ids

function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// when calling this function use await keyword
export async function signup(userData, res) {
    if (!(userData.firstName && userData.lastName && userData.email && userData.password && userData.confirmPassword)) {
        return {status: false, message: "Please provide all required fields"};
    }

    if (!isValidEmail(userData.email)) {
        return { status: false, message: "Invalid email address"};
    }

    const existingUser = await GetUserByEmail(userData.email);
    if (existingUser && existingUser.toString() !== '') {             // converts <Buffer > to string
        return { status: false, message: "User with this email already exists"};
    }

    // Check if password and confirmPassword match
    if (userData.password !== userData.confirmPassword) {
        return { status: false, message: "Passwords do not match"};
    }

    // Remove confirmPassword from userData as it's not needed for signup
    delete userData.confirmPassword;
    userData.password = await hashPassword(userData.password);


    generateToken(userData._id, res); // Generate token for user
    // Call AddUser function with userData
    const userSignup = await AddUser(userData);
    if (userSignup.inserted){ 
        return { status: true, message: "User signed up successfully"};
    }
    
    return { status: false, message: "Error signing up user"};
}

export async function login(email, password, res) {
    if (!isValidEmail(email)) {
        return { status: false, message: "Invalid email address"};
    }

    const existingUser = await GetUserByEmail(email);
    if (Buffer.isBuffer(existingUser)) {
        return { status: false, message: "User with this email does not exist"};
    }

    const isPasswordMatch = await comparePassword(password, existingUser.password);
    if (!isPasswordMatch) {
        return { status: false, message: "Invalid password"};
    }

    generateToken(existingUser._id, res); // Generate token for user
    return { status: true, message: "User logged in successfully"};
}

export async function logout(res) {
    res.cookie("jwt", "" , { maxAge: 0 });
    return { status: true, message: "Logged out successfully"};
}