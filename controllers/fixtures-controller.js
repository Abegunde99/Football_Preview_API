const { fixturesService } = require('../services/fixtures-service');
const asyncHandler = require('../middlewares/async');
const { RoundsModel } = require('../models');
const { extractNumberFromString } = require('../utils/cron');
const { ErrorResponse } = require('../utils/errorResponse');


// @desc      Get all fixtures
// @route     GET /fixtures
const getFixtures = asyncHandler(async (req, res, next) => { 
    const fixtures = await fixturesService.getFixtures();
    res.status(200).json({ success: true, fixtures });
});


// @desc      Get fixtures by league
// @route     GET /fixtures/:league
const getFixturesByLeague = asyncHandler(async (req, res, next) => {
    const fixtures = await fixturesService.getFixturesByLeague(req.params.league);
    res.status(200).json({ success: true, fixtures }); 
});

// @desc      Get fixtures by league and gameweek
// @route     GET /fixtures/:league/:gameweek
const getFixturesByGameWeek = asyncHandler(async (req, res, next) => { 
    let gameWeek;
    if (req.params.gameweek === 'current') {
        const currentRound = await RoundsModel.findOne({ 'league': new RegExp(req.params.league, 'i') });
        gameWeek = extractNumberFromString(currentRound.currentRound);
    } else {
        gameWeek = req.params.gameweek;
    }
    const fixtures = await fixturesService.getFixturesByGameWeek(req.params.league, gameWeek);
    res.status(200).json({ success: true, fixtures });
});
   
//@desc     Get fixtures by id
//@route    GET /fixtures/:id
const getFixturesById = asyncHandler(async (req, res, next) => { 
    const fixtures = await fixturesService.getFixturesById(req.params.id);
    if (!fixtures) { 
        return next(new ErrorResponse(`No fixtures found with the id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, fixtures });
});



module.exports = { getFixtures, getFixturesByLeague, getFixturesByGameWeek, getFixturesById};