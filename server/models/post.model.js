import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema);