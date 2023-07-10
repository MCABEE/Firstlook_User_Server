import fs from 'fs'
import catchAsync from '../utils/catchAsync.mjs';

// Define the route to handle the file upload
export const convertImage = catchAsync(async (req, res, next) => {
    const base64Image = req.body?.imgAfterCrop; // Assuming the base64 image is sent as a part of the request body
    const userId = req?.user?._id.toString()

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const filename = userId + Date.now() + '.jpg';

    if (!fs.existsSync("Uploads")) {
        fs.mkdirSync("Uploads");
    }

    // Specify the directory where you want to save the uploaded files
    const uploadPath = 'Uploads/' + filename;

    // Write the image buffer to the file system
    fs.writeFile(uploadPath, imageBuffer, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to store the image' });
        }
    });
    req.file = uploadPath
    next()
});
