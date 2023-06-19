import multer from 'multer';
import fs from 'fs'
import catchAsync from '../utils/catchAsync.mjs';

// Define the storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/'); // Specify the directory where you want to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.png`);
    }
});

// Create the Multer upload instance with the storage configuration
const upload = multer({ storage: storage });

// Define the route to handle the file upload
export const convertImage = catchAsync(async (req, res, next) => {
    const base64Image = req.body.imgAfterCrop; // Assuming the base64 image is sent as a part of the request body

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const imageBuffer = Buffer.from(base64Data, 'base64');

    const filename = Date.now() + '.jpg';

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