import axios from 'axios';
import catchAsync from '../utils/catchAsync.mjs';
import FormData from 'form-data';
import AppError from '../utils/appError.mjs';
import path from 'path';
import fs from 'fs'
import Aadhar from '../Model/aadharModel.mjs';

export const aadharImageUploader = catchAsync(async (req, res, next) => {

    const imageFileFront = path.basename(req.files?.uploadPathFront);
    const imageFileBack = path.basename(req.files?.uploadPathBack);

    if (!imageFileFront || !imageFileBack) throw new AppError({ statusCode: 400, message: 'Image upload failed' })

    // Read the image file as binary data
    const basePathFront = req.files?.uploadPathFront;
    const basePathBack = req.files?.uploadPathBack;

    const userId = req.user._id

    fs.readFile(basePathFront, async (err, data) => {

        if (err) {
            // Handle the error
            console.error(err);
            return next(err)
        }

        // Create a new FormData object with the image binary data
        const formData = new FormData();
        formData.append('file', data, { filename: imageFileFront });

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
        fs.unlinkSync(req.files?.uploadPathFront);

        req.post = { url: imageUrl, id: imageId, type: 'image' }

        await Aadhar.create({
            userId: userId,
            'images.sideOne.url': req.post?.url,
            'images.sideOne.id': req.post?.id
        })

        fs.readFile(basePathBack, async (err, data) => {

            if (err) {
                // Handle the error
                console.error(err);
                return next(err)
            }
    
            // Create a new FormData object with the image binary data
            const formData = new FormData();
            formData.append('file', data, { filename: imageFileBack });
    
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
            fs.unlinkSync(req.files?.uploadPathBack);
    
            req.post = { url: imageUrl, id: imageId, type: 'image' }
    
            await Aadhar.findOneAndUpdate({ _id: userId }, { $set: {
                'images.sideTwo.url': req.post?.url,
                'images.sideTwo.id': req.post?.id
            }})
    
            res.sendStatus(201)
        });
    });

})