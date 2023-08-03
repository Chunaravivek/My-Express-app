require('dotenv').config();

const moment = require('moment');
require('moment-timezone');

const timeZone = 'Asia/Kolkata';
moment.tz.setDefault(timeZone);


const logger = require('./app/configs/logging').logger;

require('./app/configs/database')(logger);
const app = require('./app/configs/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
