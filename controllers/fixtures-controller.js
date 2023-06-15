const { fixturesService } = require('../services/fixtures-service');
const asyncHandler = require('../middlewares/async');

// @desc      Get all fixtures
// @route     GET /fixtures
const getFixtures = asyncHandler(async (req, res, next) => { 
    const fixtures = await fixturesService.getFixtures();
    res.status(200).json({ success: true, fixtures });
});


// @desc      Get fixtures by league
// @route     GET /fixtures/:league
const getFixturesByLeague = asyncHandler(async (req, res, next) => {
    console.log(req.params.league)
    const fixtures = await fixturesService.getFixturesByLeague(req.params.league);
    res.status(200).json({ success: true, fixtures }); 
});

// @desc      Get fixtures by league and gameweek
// @route     GET /fixtures/:league/:gameweek
const getFixturesByLeagueAndGameweek = asyncHandler(async (req, res, next) => { 
    const fixtures = await fixturesService.getFixturesByLeagueAndGameweek(req.params.league, req.params.gameweek);
    res.status(200).json({ success: true, fixtures });
});
   


module.exports = { getFixtures, getFixturesByLeague, getFixturesByLeagueAndGameweek };