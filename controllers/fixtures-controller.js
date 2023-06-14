const { fixturesService } = require('../services/fixtures-service');

const getFixtures = async (req, res, next) => {
    try {
        const fixtures = await fixturesService.getFixtures();
        res.status(200).json({ success: true, fixtures });
    } catch (error) {
        next(error);
    }
};



const getFixturesByLeague = async (req, res, next) => {
    try {
        console.log(req.params.league)
        const fixtures = await fixturesService.getFixturesByLeague(req.params.league);
        res.status(200).json({ success: true, fixtures });
    } catch (error) {
        next(error);
    }
};

module.exports = { getFixtures, getFixturesByLeague };