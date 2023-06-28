import FormData from "form-data";
import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import fs from 'fs'
import axios from "axios";

export const compressAndUploadVideo = catchAsync(async (req, res, next) => {

    if (!req.file) {
        return res.status(400).send('No video file provided');
    }

    const basePath = req.file.path;
    console.log(basePath)
    console.log(req.file)

    fs.readFile(basePath, async (err, data) => {
        console.log(data)
        if (err) {
            // Handle the error
            console.error("err");
            return;
        }
        console.log("data")
        // Binary data of the image file
        const binaryData = data;
        console.log(binaryData)
        // Create a new FormData object
        const formData = new FormData();
        formData.append('file', binaryData, { filename: req.file.filename });

        const options = {
            method: 'POST',
            url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${process.env.CLOUDFLARE_STREAM_API_KEY}`
            },
            data: formData
        };

        const response = await axios.request(options)
        
        const userId = req.query?.userId

        // Extract the Cloudflare media URL from the response
        const result = response.data.result
        
        await User.findByIdAndUpdate(userId, { $set: { videos: result.uploadURL } })

        // delete the local image file
        fs.unlinkSync(req.file);

        res.status(200).json({ result })
    });

})