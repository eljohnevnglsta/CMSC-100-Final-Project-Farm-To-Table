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