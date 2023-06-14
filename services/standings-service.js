const { standingsRepository } = require('../repository/standings-repository');
const {ErrorResponse} = require('../utils/errorResponse');

class standingsService {
    
    static async getStandings() {
        try {
            const standings = await standingsRepository.getStandings();
            return standings;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }

    static async getStandingsByLeague(league) {
        try {
            const standings = await standingsRepository.getStandingsByLeague(league);
            return standings;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
}

module.exports = {standingsService};