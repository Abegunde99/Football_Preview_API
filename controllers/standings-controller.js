const  {standingsService}  = require('../services/standings-service');
   
const getStandings = async (req, res, next) => {
    try {
        const standings = await standingsService.getStandings();
        res.status(200).json({success: true, standings});
    } catch (error) {
        next(error);
    }
}



const getStandingsByLeague = async (req, res, next) =>{
    try {
        const standings = await standingsService.getStandingsByLeague(req.params.league);
        res.status(200).json({success: true, standings});
    } catch (error) {
        next(error);
    }
}


module.exports = {getStandings, getStandingsByLeague};