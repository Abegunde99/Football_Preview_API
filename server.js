const app = require('./app');
const { updateStandingsAndFixtures } = require('./utils/cron');

const cron = require('node-cron');

const cronSchedule = '0 */5 * * *';


const cronJob = () => {
    console.log('Updating standings and fixtures')
    updateStandingsAndFixtures();
};

//connect to database
const { connectDB } = require('./config/connection');
connectDB();


// Set up the cron job
cron.schedule(cronSchedule, cronJob);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`);
});