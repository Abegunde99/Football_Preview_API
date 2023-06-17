const app = require('./app');
const { updateStandingsAndFixtures, updateCurrentRounds} = require('./utils/cron');

const cron = require('node-cron');

const cronSchedule = '0 */5 * * *';


const cronJob = () => {
    updateStandingsAndFixtures();
};

//connect to database
const { connectDB } = require('./config/connection');
connectDB();


// Set up the cron job
cron.schedule(cronSchedule, cronJob);

// Schedule the cron job to run the function once every day at a specific time
cron.schedule('0 0 * * *', () => {
    updateCurrentRounds();
});



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`);
});