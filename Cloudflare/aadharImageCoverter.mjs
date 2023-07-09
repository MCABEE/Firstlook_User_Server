import fs from 'fs'
import catchAsync from '../utils/catchAsync.mjs';

// Define the route to handle the file upload
export const aadharImageCoverter = catchAsync(async (req, res, next) => {
    const { imgFrontAfterCrop, imgBackAfterCrop } = req.body; // Assuming the base64 image is sent as a part of the request body
    const userId = req?.user?._id.toString()

    const base64DataFront = imgFrontAfterCrop.replace(/^data:image\/\w+;base64,/, '');
    const base64DataBack = imgBackAfterCrop.replace(/^data:image\/\w+;base64,/, '');

    const imageBufferFront = Buffer.from(base64DataFront, 'base64');
    const imageBufferBack = Buffer.from(base64DataBack, 'base64');

    const sideOne = userId + Date.now() + 'front.jpg';
    const sideTwo = userId + Date.now() + 'back.jpg';

    if (!fs.existsSync("Uploads")) {
        fs.mkdirSync("Uploads");
    }

    // Specify the directory where you want to save the uploaded files
    const uploadPathFront = 'Uploads/' + sideOne;
    const uploadPathBack = 'Uploads/' + sideTwo;

    // Write the image buffer to the file system
    fs.writeFile(uploadPathFront, imageBufferFront, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to store the image' });
        }
    });

    // Write the image buffer to the file system
    fs.writeFile(uploadPathBack, imageBufferBack, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to store the image' });
        }
    });

    req.files = { uploadPathFront, uploadPathBack }
    next()
});
