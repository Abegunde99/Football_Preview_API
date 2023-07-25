const { FixturesModel, CustomFixturesModel } = require('../models');
const { fetchFixtures } = require('../utils/external_api');
const { ErrorResponse } = require('../utils/errorResponse');

const fixturesRepository = {
    postFixtures: async (fixtures) => { 
        try {
            const newFixtures = await FixturesModel.create(fixtures);
            return newFixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    updateFixtures: async (id, fixtures) => { 
        try {
            //check if the fixture exists
            const fixture = await FixturesModel.findById(id);
            if (!fixture) {
                throw new ErrorResponse(`Fixture with id ${id} not found`, 404);
            }
            const newFixture = await FixturesModel.findByIdAndUpdate(id, fixtures, { new: true });
            return newFixture;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    deleteFixtures: async (id) => { 
        try {
            //check if the fixture exists
            const fixture = await FixturesModel.findById(id);
            if (!fixture) {
                throw new ErrorResponse(`Fixture with id ${id} not found`, 404);
            }
            await FixturesModel.findByIdAndDelete(id);
            return;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

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
            if (league === 'Friendlies' || league === 'European Matches' || league === 'friendlies' || league === 'european matches') {
                //return fixtures which fixture.date + 2 hours is less than current date
                const fixtures = await FixturesModel.find({ 'league.name': new RegExp(league, 'i'), 'fixture.date': { $gt: new Date(Date.now() + 2 * 60 * 60 * 1000) } });
                return fixtures;
            } 
            const fixtures = await FixturesModel.find({ 'league.name': new RegExp(league, 'i') });
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getFixturesByGameWeek: async (league, gameWeek) => { 
        try {
            const fixtures = await FixturesModel.find({ 'league.name': new RegExp(league, 'i'), 'gameWeek': gameWeek });
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getFixturesByCurrentRound: async (league, currentRound) => { 
        try {
            const fixtures = await FixturesModel.find({ 'league.name': new RegExp(league, 'i'), 'gameWeek': currentRound });
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getFixturesById: async (id) => { 
        try {
            // const fixtures = await FixturesModel.findById(id);
            const fixtures = await FixturesModel.findOne({'fixture.id': id});
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getFixtureByFixtureId: async (id) => { 
        try {
            const fixtures = await FixturesModel.findById(id);
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getFixturesByCompetition: async (competition) => { 
        try {
            const fixtures = await FixturesModel.find({ 'competition': new RegExp(competition, 'i') }).sort({createdAt: -1});
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    getHomeOutsideFixtures: async () => {
        try {
            const fixtures = await FixturesModel.find({ 'competition': { $in: [new RegExp('Champions League', 'i'), new RegExp('Europa League', 'i'), new RegExp('Conference League', 'i')] } }).sort({createdAt: -1});
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }  
    }
};

module.exports = { fixturesRepository };