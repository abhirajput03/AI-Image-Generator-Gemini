import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({ success: false, error : "Unauthorized request" });
        }
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(verifiedToken?.userId).select("-password -refreshToken");
        req.user = user;
        next()
    } catch (error) {
        console.log("Error-----------------", error)
        return res.status(401).json({ success: false, error: "Invalid or expired access token" })
    }
}