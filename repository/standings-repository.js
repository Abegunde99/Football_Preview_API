const { StandingsModel } = require('../models');
const { fetchStandings } = require('../utils/external_api');
const {ErrorResponse} = require('../utils/errorResponse');

const standingsRepository = {
    
    getStandings: async () => {
        try {
            const standings = await StandingsModel.find({});
            return standings;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    },

    
    getStandingsByLeague: async (league) =>{ 
        try {
            const standings = await StandingsModel.find({ league: league });
            return standings;
        } catch (error) {
            throw new ErrorResponse(error.message, 500);
        }
    }
};  

module.exports = {standingsRepository};