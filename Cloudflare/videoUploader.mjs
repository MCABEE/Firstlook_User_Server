import fs from 'fs'
import FormData from "form-data";
import catchAsync from "../utils/catchAsync.mjs";
import axios from "axios";
import Post from '../Model/postModel.mjs';

export const uploadVideo = catchAsync(async (req, res, next) => {

    const videoFile = req.file;
    if (!videoFile) {
        if (!videoFile) throw new AppError({ statusCode: 400, message: 'No video file provided' })
    }

    // Read the image file as binary data
    const fileData = fs.readFileSync(videoFile.path);

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', fileData, { filename: videoFile.originalname });

    const { data } = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
        formData,
        {
            headers:
                { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${process.env.CLOUDFLARE_STREAM_API_KEY}` }
        }
    )

    // delete the local image file
    fs.unlinkSync(videoFile.path);

    req.post = { url: data.result.preview, id: data.result.uid, type: 'video' }

    // passing to next middleware to save the post in db
    next();
});
