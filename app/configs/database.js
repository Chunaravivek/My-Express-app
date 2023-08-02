const mongoose = require('mongoose');

module.exports = function (logger) {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        () => logger.info(`Connected to development DB...`)
    ).catch((error) => logger.info(`MongoDB connection error: ${error}`));
}