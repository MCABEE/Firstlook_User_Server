import axios from 'axios';
import catchAsync from '../utils/catchAsync.mjs';
import FormData from 'form-data';
import AppError from '../utils/appError.mjs';
import path from 'path';
import fs from 'fs'

export const uploadImage = catchAsync(async (req, res, next) => {

    const imageFile = path.basename(req.file);
    if (!imageFile) throw new AppError({ statusCode: 400, message: 'Image upload failed' })

    // Read the image file as binary data
    const basePath = req.file;

    fs.readFile(basePath, async (err, data) => {

        if (err) {
            // Handle the error
            console.error(err);
            return next(err)
        }

        // Create a new FormData object with the image binary data
        const formData = new FormData();
        formData.append('file', data, { filename: imageFile });

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

        // Extract the Cloudflare media URL from the response
        const imageUrl = response.data.result.variants[0]
        const imageId = response.data.result.id

        // delete the local image file
        fs.unlinkSync(req.file);

        req.post = { url: imageUrl, id: imageId, type: 'image' }
        next();
    });

})