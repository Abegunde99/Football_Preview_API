const express = require('express');
const router = express.Router();
const { getFixtures, getFixturesByLeague, getFixturesByLeagueAndGameweek } = require('../controllers/fixtures-controller');

router.get('/', getFixtures);
router.get('/:league', getFixturesByLeague);
router.get('/:league/:gameweek', getFixturesByLeagueAndGameweek);

module.exports = router;