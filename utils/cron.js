const cron = require('node-cron');


exports.cron = cron.schedule('1 * * * *', () => { 
    console.log('running a task every 5 minutes', new Date().toISOString());
});


