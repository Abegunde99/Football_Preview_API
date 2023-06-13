const app = require('./app');
const cron = require('./utils/cron');
const {fetchData} = require('./utils/external_api');

fetchData();

// cron.cron.start();

//connect to database
const { connectDB } = require('./config/connection');
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`);
});