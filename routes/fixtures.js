const express = require('express');
const router = express.Router();
const { getFixtures, getFixturesByLeague, getFixturesByGameWeek, getFixturesById} = require('../controllers/fixtures-controller');

router.get('/fixtures', getFixtures);
router.get('/fixture/:id', getFixturesById);
router.get('/fixtures/:league', getFixturesByLeague);
router.get('/fixtures/:league/:gameweek', getFixturesByGameWeek);

module.exports = router;