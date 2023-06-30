import axios from 'axios';
import catchAsync from '../utils/catchAsync.mjs';
import FormData from 'form-data';
import AppError from '../utils/appError.mjs';
import fs from 'fs'
import path from 'path';
import User from '../Model/userModel.mjs';
import Post from '../Model/postModel.mjs';

export const uploadImage = catchAsync(async (req, res, next) => {

    const imageFile = path.basename(req.file);
    if (!imageFile) throw new AppError({ statusCode: 400, message: 'Image upload failed' })

    // Read the image file as binary data
    const basePath = 'Uploads/' + imageFile;

    fs.readFile(basePath, async (err, data) => {

        if (err) {
            // Handle the error
            console.error(err);
            return;
        }

        // Binary data of the image file
        const binaryData = data;
        // Create a new FormData object
        const formData = new FormData();
        formData.append('file', binaryData, { filename: imageFile });

        const options = {
            method: 'POST',
            url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${process.env.CLOUDFLARE_API_KEY}`
            },
            data: formData
        };

        const response = await axios.request(options)

        const userId = req.query?.userId

        // Extract the Cloudflare media URL from the response
        const imageUrl = response.data.result.variants[0]
        const imageId = response.data.result.id

        await User.findByIdAndUpdate(userId,
            { $set: { 'profileImage.url': imageUrl, 'profileImage.id': imageId } }
        )

        await Post.create({
            userId,
            content: {
                url: imageUrl,
                id: imageId,
            }
        })

        // delete the local image file
        fs.unlinkSync(req.file);

        res.status(200).json({ url: imageUrl })
    });

})