const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
//const csurf = require('csurf');

const adminRoutes = require('../routes/adminRoutes');
const accountRoutes = require('../routes/accountRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
//app.use(csurf({ cookie: true }));

const errorMiddleware = require('../middlewares/error');

// Error handling middleware
app.use(errorMiddleware);

app.get('/api', async (req, res) => {
    res.status(200).send(`Welcome to S4apps Panel`);
});

app.use('/v1/admin', adminRoutes);
app.use('/v1/accounts', accountRoutes);

module.exports = app;
