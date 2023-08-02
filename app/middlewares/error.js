require('express-async-errors');

function errorMiddleware(err, req, res, next) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorMiddleware;