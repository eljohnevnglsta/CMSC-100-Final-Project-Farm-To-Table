import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'QMrGNdBdAd3YbNwIXv4itsADGvf834dddluDpZT7zfM=';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15d' });

    res.cookie('jwt', token, { 
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms format
        httpOnly: true,
        sameSite: "strict"
    });
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token){
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        if(verified){
            req.verified = true;
            return next();
        }
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}