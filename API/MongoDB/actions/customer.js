import { User } from "../controllers/UserController.js";
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
        if (!isValidEmail(req.body.email)) {
            res.send({ status: false, message: "Invalid email address"});
            return;
        }
    
        const existingUser = await User.findOne({email: req.body.email});
        
        if (!existingUser) {
            res.send({ status: false, message: "User with this email does not exist"});
            return;
        }
    
        const isPasswordMatch = await comparePassword(req.body.password, existingUser.password);
    
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