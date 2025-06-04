import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            req.body.password = await bcrypt.hash(password, salt);
            let newUser = await User.create(req.body);
            return res.status(200).json({ user: newUser, msg: "Sign up Successfull", success: true })
        }
        return res.status(403).json({ error: "User already exist ", success: false })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false })
    }
}

export const signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: "User doesn't exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: "Invalid password" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true
        }

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ success: true, msg: "User Logged in", user: loggedInUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false })
    }
}

export const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ success: true, msg: "User Logged Out" })
    } catch (error) {
        console.log("Error");
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: "Unauthorized request", success: false });
        }
        const verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(verifiedToken?.userId);

        if (refreshToken != user.refreshToken) {
            return res.status(401).json({ error: "Invalid or expired refresh token", success: false })
        }

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false })
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({ success: true, msg: "Access Token refreshed", data: { accessToken, refreshToken: newRefreshToken } })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const checkAuthentication = async (req, res) => {
    return res.status(200).json({ success: true, msg: "User is logged in", user: req.user })
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ success: true, msg: "Users fetched", users })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json({ success: true, msg: "User fetched", user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
}