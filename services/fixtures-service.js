const { fixturesRepository } = require('../repository/fixtures-repository');
const { ErrorResponse } = require('../utils/errorResponse');

class fixturesService {
    
    static async getFixtures() {
        try {
            const fixtures = await fixturesRepository.getFixtures();
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }


    static async getFixturesByLeague(league) {
        try {
            const fixtures = await fixturesRepository.getFixturesByLeague(league);
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getFixturesByGameWeek(league, gameWeek) { 
        try {
            const fixtures = await fixturesRepository.getFixturesByGameWeek(league, gameWeek);
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getFixturesByCurrentRound(league, currentRound) { 
        try {
            const fixtures = await fixturesRepository.getFixturesByCurrentRound(league, currentRound);
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getFixturesById(id) { 
        try {
            const fixtures = await fixturesRepository.getFixturesById(id);
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async postFixtures(fixtures) { 
        try {
            const newFixtures = await fixturesRepository.postFixtures(fixtures);
            return newFixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async updateFixtures(id, fixtures) { 
        try {
            const newFixtures = await fixturesRepository.updateFixtures(id, fixtures);
            return newFixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async deleteFixtures(id) { 
        try {
            await fixturesRepository.deleteFixtures(id);
            return;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getFixtureByFixtureId(id) { 
        try {
            const fixtures = await fixturesRepository.getFixtureByFixtureId(id);
            return fixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getFixturesByCompetition(competition, page, limit) { 
        try {
            const fixtures = await fixturesRepository.getFixturesByCompetition(competition, );
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedFixtures = fixtures.slice(startIndex, endIndex);
            return paginatedFixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getHomeOutsideFixtures(page, limit) {
        try {
            const fixtures = await fixturesRepository.getHomeOutsideFixtures();
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedFixtures = fixtures.slice(startIndex, endIndex);
            return paginatedFixtures;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
}

module.exports = {fixturesService};