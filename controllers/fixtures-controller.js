const { fixturesService } = require('../services/fixtures-service');
const asyncHandler = require('../middlewares/async');
const { RoundsModel } = require('../models');
const { extractNumberFromString } = require('../utils/cron');
const { ErrorResponse } = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');



// @desc      Get all fixtures
// @route     GET /fixtures
const getFixtures = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const {fixtures, total} = await fixturesService.getFixtures(page, limit);
    res.status(200).json({ success: true, pagination: {page, limit, total}, fixtures});
});


// @desc      Get fixtures by league
// @route     GET /fixtures/:league
const getFixturesByLeague = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const {fixtures, total} = await fixturesService.getFixturesByLeague(req.params.league, page, limit);
    res.status(200).json({ success: true, pagination: {page, limit, total}, fixtures }); 
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

//@desc   Post fixtures
//@route  POST /fixtures
const postFixtures = asyncHandler(async (req, res, next) => { 
    const { homeTeam, awayTeam, competition, dateAndTime, league } = req.body;
    const fixtureId = Math.floor(Math.random() * 1000000);
    
    //upload 2 images to cloudinary from an array of images
    // for (let i = 0; i < req.files.length; i++) {
    //     const { path } = req.files[i];
    //     const logo = await cloudinary.uploader.upload(path, { folder: 'upload' });
    //     req.files[i].secure_url = logo.secure_url;
    // }
    const homeLogoFile = req.files['homeLogo'][0]; // Assuming the field name is 'homeLogo' in the request
    const awayLogoFile = req.files['awayLogo'][0];
    console.log(homeLogoFile)
    const homeLogo = await cloudinary.uploader.upload(homeLogoFile.path, { folder: 'upload' });
    const awayLogo = await cloudinary.uploader.upload(awayLogoFile.path, { folder: 'upload' });

    
    const fixtures = {
        fixture: {
            id: fixtureId,
            date: dateAndTime,
        },
        league: {
            name: league,
        },
        teams: {
            home: {
                name: homeTeam,
                logo: homeLogo.secure_url
            },
            away: {
                name: awayTeam,
                logo: awayLogo.secure_url
            }
        },
        competition: competition,
    }
    const newFixtures = await fixturesService.postFixtures(fixtures);
    res.status(201).json({ success: true, newFixtures });
});


// @desc      Update fixtures
// @route     PUT /fixtures/:id
const updateFixtures = asyncHandler(async (req, res, next) => { 
    //check if fixture exists
    const fixtureExists = await fixturesService.getFixtureByFixtureId(req.params.id);
    if (!fixtureExists) {
        return next(new ErrorResponse(`No fixture with the id of ${req.params.id}`, 404));
    }

    const homeLogoFile = req.files['homeLogo'] ? req.files['homeLogo'][0] : null;
    const awayLogoFile = req.files['awayLogo'] ? req.files['awayLogo'][0] : null;

    let awaylogo = {};
    let homelogo = {}
    
    if (homeLogoFile) {
        const homeLogo = await cloudinary.uploader.upload(homeLogoFile.path, { folder: 'upload' });
        homelogo.secure_url = homeLogo.secure_url;
    } else {
        homelogo.secure_url = req.body.homeLogo || fixtureExists.teams.home.logo;
    }

   
    if (awayLogoFile) { 
        const awayLogo = await cloudinary.uploader.upload(awayLogoFile.path, { folder: 'upload' });
        awaylogo.secure_url = awayLogo.secure_url;
    } else {
        awaylogo.secure_url = req.body.awayLogo || fixtureExists.teams.away.logo;
    }
   

    const fixture = {
        teams: {
            home: {
                name: req.body.homeTeam,
                logo: homelogo.secure_url
            },
            away: {
                name: req.body.awayTeam,
                logo: awaylogo.secure_url
            }
        },
        fixture: {
            id: req.body.id || fixtureExists.fixture.id,
            date: req.body.dateAndTime,
        },
        league: {
            name: req.body.league,
        },
    };

    const fixtures = await fixturesService.updateFixtures(req.params.id, fixture);
    res.status(200).json({ success: true, fixtures });
});

// @desc      Delete fixtures
// @route     DELETE /fixtures/:id
const deleteFixtures = asyncHandler(async (req, res, next) => {
    //check if fixture exists
    const fixtureExists = await fixturesService.getFixtureByFixtureId(req.params.id);
    if (!fixtureExists) {
        return next(new ErrorResponse(`No fixture with the id of ${req.params.id}`, 404));
    }
    //delete image from cloudinary
    const homeTeamLogo = fixtureExists.teams.home.logo;
    const awayTeamLogo = fixtureExists.teams.away.logo;
    const homeTeamLogoId = homeTeamLogo.split('/').slice(-1)[0].split('.')[0];
    const awayTeamLogoId = awayTeamLogo.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.uploader.destroy(homeTeamLogoId);
    await cloudinary.uploader.destroy(awayTeamLogoId);

    const fixtures = await fixturesService.deleteFixtures(req.params.id);
    res.status(200).json({ success: true, fixtures: {} });

});


//@desc  Get fixtures by competition
//@route GET /competition/fixtures/:competition
const getFixturesByCompetition = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const {fixtures, total} = await fixturesService.getFixturesByCompetition(req.params.competition, page, limit);
    res.status(200).json({ success: true, pagination: {page, limit, total}, fixtures });
});


//@desc  get homeOutside fixtures
//@route GET /homeOutside/fixtures
const getHomeOutsideFixtures = asyncHandler(async (req, res, next) => { 
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const {fixtures, total} = await fixturesService.getHomeOutsideFixtures(page, limit);
    res.status(200).json({ success: true, pagination: {page, limit, total}, fixtures});
});
module.exports = { getFixtures, getFixturesByLeague, getFixturesByGameWeek, getFixturesById, postFixtures, updateFixtures, deleteFixtures, getFixturesByCompetition, getHomeOutsideFixtures};