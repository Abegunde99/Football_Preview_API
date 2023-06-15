const { standingsService } = require('../services/standings-service');
const asyncHandler = require('../middlewares/async');

// @desc      Get all standings
// @route     GET /standings 
const getStandings = asyncHandler(async (req, res, next) => {
    const standings = await standingsService.getStandings();
    res.status(200).json({success: true, standings});
})


// @desc      Get standings by league
// @route     GET /standings/:league
const getStandingsByLeague = asyncHandler(async (req, res, next) => { 
    const standings = await standingsService.getStandingsByLeague(req.params.league);
    res.status(200).json({ success: true, standings });
});


module.exports = {getStandings, getStandingsByLeague};