const { FixturesModel } = require('../models');
const { fetchFixtures } = require('../utils/external_api');
const { ErrorResponse } = require('../utils/errorResponse');

const fixturesRepository = {
    getFixtures: async () => {
        try {
            const fixtures = await FixturesModel.find({});
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },


    getFixturesByLeague: async (league) => {
        try {
            const fixtures = await FixturesModel.find({ 'league.name': new RegExp(league, 'i') });
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
};

module.exports = { fixturesRepository };