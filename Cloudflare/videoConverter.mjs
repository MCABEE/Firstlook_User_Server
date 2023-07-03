import fs from 'fs';
import multer from 'multer';
import AppError from '../utils/appError.mjs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("Uploads")) {
            fs.mkdirSync("Uploads");
        }

        if (!fs.existsSync("Uploads/videos")) {
            fs.mkdirSync("Uploads/videos");
        }

        cb(null, "Uploads/videos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

 const upload = multer({
    storage: storage,
});

export default function (req, res, next) {
    upload.single('video')(req, res, (error) => {
        if (error) {
            console.error('Error uploading video:', error);
            throw new AppError({ name: 'Multer error', statusCode: 500, message: 'video upload failed' })
        }

        next();
    });
}