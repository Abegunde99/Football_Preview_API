const app = require('./app');
const { updateStandingsAndFixtures, updateCurrentRounds} = require('./utils/cron');

const cron = require('node-cron');

//connect to database
const { connectDB } = require('./config/connection');
connectDB();


// Set up the cron job to run the updateStandingsAndFixtures function every 3 hours
// cron.schedule('0 */3 * * *', async () => {
//     await updateStandingsAndFixtures();
// });

//set up setTimeout to run every 3 hours
// setTimeout(async () => {
//     await updateStandingsAndFixtures();
//     await updateCurrentRounds();
//     console.log('done updating standings and fixtures');
// }, 3000);


// Set up the setTimeout to run the updateCurrentRound function once every 20 hours
// setTimeout(async () => {
//     await updateCurrentRounds();
// }, 1000 * 60 * 60 * 20);


// Schedule the cron job to run the updateCurrentRound function once every day at a specific time
// cron.schedule('0 0 * * *', async () => {
//     await updateCurrentRounds();
// });



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`);
});