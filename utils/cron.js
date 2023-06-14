const { fetchFixtures, fetchStandings } = require('./external_api');
const { StandingsModel, FixturesModel } = require('../models');
const { ErrorResponse } = require('./errorResponse');

//function to update standings and fixtures in the database
const updateStandingsAndFixtures = async () => {
    try {
        const standings = await fetchStandings();
        const fixtures = await fetchFixtures();
        await StandingsModel.deleteMany({});
        await FixturesModel.deleteMany({});
        await StandingsModel.insertMany(standings);
        await FixturesModel.insertMany(fixtures);
        return { standings, fixtures };
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
}

module.exports = { updateStandingsAndFixtures };