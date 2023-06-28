import fs from 'fs'
import multer from 'multer';

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

export const upload = multer({
    storage: storage,
});
