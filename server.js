const app = require('./app');
const { updateStandingsAndFixtures, updateCurrentRounds} = require('./utils/cron');

const cron = require('node-cron');

//connect to database
const { connectDB } = require('./config/connection');
connectDB();


// Set up the cron job to run the updateStandingsAndFixtures function every 3 hours
cron.schedule('0 */3 * * *', async () => {
    await updateStandingsAndFixtures();
});

// Schedule the cron job to run the updateCurrentRound function once every day at a specific time
cron.schedule('0 0 * * *', async () => {
    await updateCurrentRounds();
});

//cron job to run a function every 5 minutes
// cron.schedule('*/5 * * * *', async () => {
//     console.log('running a task every 5 minutes');
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`);
});