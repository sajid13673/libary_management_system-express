const updateFines = require('../utils/updateFines')
const cron = require('node-cron');

cron.schedule('0 0 * * *', updateFines);