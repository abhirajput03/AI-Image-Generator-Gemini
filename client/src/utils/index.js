import { surpriseMePrompts } from "../constants";
import FileSaver from 'file-saver';

export const getRandomPrompt = (prompt) => {
    let index = Math.floor(Math.random() * surpriseMePrompts.length)
    let randomPrompt = surpriseMePrompts[index]
    if (randomPrompt === prompt) getRandomPrompt(prompt)
    return randomPrompt
}

export const downloadImage = (postUrl, _id) => {
    FileSaver.saveAs(postUrl, `image${Date.now()}.png`)
}

export const validate = (formData) => {
    const newErrors = {};
    if (!formData.username) {
        newErrors.username = "username is required";
    }
    if (!formData.password) {
        newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
}