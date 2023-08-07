const fs = require('fs');

async function removeFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filepath, function(err) {
            console.log("err", err)
            if(err) reject(err);
        });
        resolve(true);
    });
}

module.exports = { removeFile };