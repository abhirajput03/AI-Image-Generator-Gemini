import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { GoogleGenAI, Modality } from "@google/genai";

export const generatePost = async (req, res) => {
    const { prompt } = req.body;
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: prompt,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                return res.status(200).json({ success: true, msg: "image generated", data: imageData })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "image generation failed" })
    }
}

export const createPost = async (req, res) => {
    try {
        const { prompt, photo } = req.body;
        const postUrl = await uploadOnCloudinary(photo)
        const post = await Post.create({ user: req.user._id, prompt, postUrl });
        return res.status(200).json({ success: true, msg: "post created", post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate({ path: "user", select: "username" })
        return res.status(200).json({ success: true, msg: "posts fetched", posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id }).populate({ path: "user", select: "username" });
        return res.status(200).json({ success: true, msg: "gallery fetched", posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const getPostByUser = async (req, res) => {
    try {
        const { id } = req?.params;
        const posts = await Post.find({ user: id }).populate({ path: "user", select: "username" });
        return res.status(200).json({ success: true, msg: "gallery fetched by user", posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const removePost = async (req, res) => {
    try {
        const { id } = req?.params;
        const removedPost = await Post.findByIdAndDelete(id)
        return res.status(200).json({ success: true, msg: "post removed", post: removedPost });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}