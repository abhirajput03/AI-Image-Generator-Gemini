import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
}