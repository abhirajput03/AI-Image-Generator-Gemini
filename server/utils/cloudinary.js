import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (photo) => {
    try {
        const uploadedPost = await cloudinary.uploader.upload(photo);
        return uploadedPost.url
    } catch (error) {
        console.log(error);
    }
}