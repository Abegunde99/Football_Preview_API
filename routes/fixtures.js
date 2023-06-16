const express = require('express');
const router = express.Router();
const { getFixtures, getFixturesByLeague, getFixturesByGameWeek} = require('../controllers/fixtures-controller');

router.get('/', getFixtures);
router.get('/:league', getFixturesByLeague);
router.get('/:league/:gameweek', getFixturesByGameWeek);

module.exports = router;