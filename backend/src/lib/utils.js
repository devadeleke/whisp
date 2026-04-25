import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateTokenAndSetCookie = (userId, res) => {
    //Add explicit guard for JWT_SECRET_KEY before calling jwt.sign.
    if (!ENV.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not configured');
    }

    const token = jwt.sign({userId}, ENV.JWT_SECRET_KEY, {
        expiresIn: '7d'
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    
    return token;
}