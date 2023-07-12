const { fixturesRepository } = require('../repository/fixtures-repository');
const { ErrorResponse } = require('../utils/errorResponse');

class fixturesService {
    
    static async getFixtures(page, limit) {
        try {
            const fixture = await fixturesRepository.getFixtures();
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const fixtures = fixture.slice(startIndex, endIndex);
            const total = fixture.length;
            return {fixtures, total};
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }


    static async getFixturesByLeague(league, page, limit) {
        try {
            const fixture = await fixturesRepository.getFixturesByLeague(league);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const fixtures = fixture.slice(startIndex, endIndex);
            const total = fixture.length;
            return {fixtures, total};
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
            const fixture = await fixturesRepository.getFixturesByCompetition(competition );
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const fixtures = fixture.slice(startIndex, endIndex);
            const total = fixture.length;
            return {fixtures, total};
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getHomeOutsideFixtures(page, limit) {
        try {
            const fixture = await fixturesRepository.getHomeOutsideFixtures();
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const fixtures = fixture.slice(startIndex, endIndex);
            const total = fixture.length;
            return {fixtures, total};
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
}

module.exports = {fixturesService};