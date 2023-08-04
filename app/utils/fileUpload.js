const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        const uniqueFileName = shortid.generate() + '-' + file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit the image size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Error: Images only!'));
        }
    },
});

module.exports = upload;
