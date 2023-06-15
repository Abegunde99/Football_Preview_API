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

    //find standings by groups/league
    getStandingsByLeague: async (group) =>{ 
        try {
            const standings = await StandingsModel.find({ group: new RegExp(group, 'i') });
            return standings;
        }catch(error) {
        throw new ErrorResponse(error.message, 500);
        }
    }
    
};  

module.exports = {standingsRepository};