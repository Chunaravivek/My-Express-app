// app/utils/isImage.js
const mime = require('mime-types');

function isImage(file) {
    const mimeType = mime.lookup(file);
    return mimeType && mimeType.startsWith('image/');
}

module.exports = { isImage };
