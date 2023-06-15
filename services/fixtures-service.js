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
}

module.exports = {fixturesService};