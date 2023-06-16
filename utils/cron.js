const { fetchFixtures, fetchStandings, fetchCurrentRounds } = require('./external_api');
const { StandingsModel, FixturesModel, RoundsModel } = require('../models');
const { ErrorResponse } = require('./errorResponse');

//function to update standings and fixtures in the database
const updateStandingsAndFixtures = async () => {
    try {
        const standings = await fetchStandings();
        const fixtures = await fetchFixtures();
        await StandingsModel.deleteMany({});
        await FixturesModel.deleteMany({});

        //add game week to fixtures
        fixtures.forEach(fixture => {
            fixture.gameWeek = extractNumberFromString(fixture.league.round);
        });
        console.log(fixtures[0])
        await StandingsModel.insertMany(standings);
        await FixturesModel.insertMany(fixtures);
        return { standings, fixtures };
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
}

function extractNumberFromString(str) {
    const regex = /(\d+)$/;
    const match = str.match(regex);
    
    if (match && match[1]) {
      return parseInt(match[1]);
    } else {
      return null; // or handle the case when no number is found
    }
}

const updateCurrentRounds = async () => { 
    try {
        const currentRounds = await fetchCurrentRounds();
        await RoundsModel.deleteMany({});
        await RoundsModel.insertMany(currentRounds);
        return currentRounds;
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
}


module.exports = { updateStandingsAndFixtures , updateCurrentRounds, extractNumberFromString};