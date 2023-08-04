let winston = require('winston');
require('express-async-errors');

module.exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:MM:ss'
        }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            handleRejections: true,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.prettyPrint()
            )
        }),
        new winston.transports.File({
            filename: 'logs/logfile.log',
            format: winston.format.errors({ stack: true }),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
    ],
    exitOnError: false,
});