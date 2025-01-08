const cron = require('node-cron');
const clearExpiredTokens = require('../utils/clearExpiredTokens');

// Schedule the cleanup task to run every day at midnight
cron.schedule('0 0 * * *', clearExpiredTokens);
